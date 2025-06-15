# Feedback Application Backend

Бэкенд-часть приложения для учета и анализа обратной связи преподавателей об учащихся.

## Технологии

- Node.js
- Express
- TypeScript
- MongoDB с Mongoose
- JWT для аутентификации

## Структура проекта

```
FeedbackApp-Backend/
  ├── src/                    # Исходный код
  │   ├── controllers/        # Контроллеры для обработки запросов
  │   ├── middlewares/        # Промежуточное ПО (аутентификация и т.д.)
  │   ├── models/             # Mongoose модели данных
  │   ├── routes/             # Маршруты API
  │   └── index.ts            # Точка входа приложения
  ├── .env                    # Файл с переменными окружения
  ├── package.json            # Зависимости и скрипты проекта
  ├── tsconfig.json           # Конфигурация TypeScript
  └── README.md               # Документация проекта
```

## Запуск проекта

### Требования

- Node.js (версия 14 или выше)
- MongoDB (локально или в облаке)

### Установка

1. Клонировать репозиторий
2. Установить зависимости:
   ```
   npm install
   ```
3. Создать файл `.env` с переменными окружения:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/feedback-app
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=7d
   ```

### Запуск для разработки

```
npm run dev
```

### Сборка и запуск для production

```
npm run build
npm start
```

## API Endpoints

### Аутентификация

- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход пользователя

### Студенты

- `GET /api/students` - Получение всех студентов
- `GET /api/students/group/:group` - Получение студентов по группе
- `GET /api/students/:id` - Получение студента по ID
- `POST /api/students` - Создание нового студента
- `PUT /api/students/:id` - Обновление данных студента
- `DELETE /api/students/:id` - Удаление студента

### Отзывы

- `GET /api/feedback` - Получение всех отзывов
- `GET /api/feedback/teacher/:teacherId` - Получение отзывов по ID преподавателя
- `GET /api/feedback/student/:studentId` - Получение отзывов по ID студента
- `GET /api/feedback/group/:group` - Получение отзывов по группе
- `POST /api/feedback` - Создание нового отзыва
- `PUT /api/feedback/:id` - Обновление отзыва
- `DELETE /api/feedback/:id` - Удаление отзыва 