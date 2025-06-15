import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { FeedbackProvider } from './src/context/FeedbackContext';
import AppNavigator from './src/navigation/AppNavigator';
import * as Notifications from 'expo-notifications';
import * as notificationService from './src/services/notificationService';

// Настройка обработчиков уведомлений при запуске приложения
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  // Создаем ref для хранения обратного вызова уведомления
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const reportReminderInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Периодическое напоминание о сроках отчетов (для тестирования)
  const startReportReminders = () => {
    // Остановить предыдущий интервал, если он существует
    if (reportReminderInterval.current) {
      clearInterval(reportReminderInterval.current);
    }
    
    // Имитация наличия родительского собрания через 7 дней
    const parentMeetingDate = new Date();
    parentMeetingDate.setDate(parentMeetingDate.getDate() + 7);
    
    // Запуск интервала с периодичностью 30 секунд
    reportReminderInterval.current = setInterval(() => {
      notificationService.sendLocalNotification(
        'Напоминание о формировании отчета',
        `До родительского собрания осталось 7 дней. Не забудьте подготовить отчет!`,
        {
          type: 'REPORT_DUE',
          dueDate: parentMeetingDate.toISOString(),
          reportType: 'отчет к родительскому собранию'
        }
      );
      console.log('Отправлено напоминание о формировании отчета');
    }, 30000); // 30 секунд
  };
  
  // Инициализация уведомлений при запуске приложения
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Инициализируем локальные уведомления
        const initialized = await notificationService.initializeLocalNotifications();
        
        if (initialized) {
          // Добавляем обработчик для получения уведомлений
          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received:', notification);
          });
          
          // Добавляем обработчик для нажатия на уведомление
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification tapped:', response);
            // Здесь можно добавить логику навигации в зависимости от типа уведомления
          });
          
          // Проверяем и отправляем напоминания
          await notificationService.checkAndSendReminders();
          
          // Запускаем периодические напоминания о сроках отчетов (для тестирования)
          startReportReminders();
        }
        
        // Очищаем подписки при размонтировании
        return () => {
          if (notificationListener.current) {
            Notifications.removeNotificationSubscription(notificationListener.current);
          }
          if (responseListener.current) {
            Notifications.removeNotificationSubscription(responseListener.current);
          }
          // Очищаем интервал напоминаний
          if (reportReminderInterval.current) {
            clearInterval(reportReminderInterval.current);
          }
        };
      } catch (error) {
        console.error('Failed to initialize notifications:', error);
      }
    };
    
    initializeNotifications();
  }, []);
  
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <FeedbackProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </FeedbackProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
