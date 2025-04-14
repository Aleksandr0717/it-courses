import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
// Middleware
app.use(cors()); // Разрешаем запросы с фронтенда
app.use(express.json()); // Для обработки JSON-тела запросов

(async () => {
    const {default: UserController} = await import('./controller/UserController.js');
    const {default: CourseTypesController} = await import('./controller/CoursesController.js');
    app.use('/api/users', UserController);
    app.use('/api/courses', CourseTypesController);

    app.listen(port, () => { //Подключение сервера
        console.log('Server is running on port 3000');
    });
})();