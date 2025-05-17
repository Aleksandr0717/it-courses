import type { App } from "vue";
import UserService from "./services/UsersService";
import CourseService from "./services/CourseService";

export const registerServices = (app: App<Element>) => {
    app.provide("userService", UserService);
    app.provide("courseService", CourseService);
}