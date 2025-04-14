import UserService from "./services/UsersService.js";
import CourseService from "./services/CourseService.js";

export const registerServices = (app) => {
    app.provide("userService", UserService);
    app.provide("courseService", CourseService);
}