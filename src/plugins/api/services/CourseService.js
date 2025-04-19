import { API_BASE_URL, fetchData } from "../apiConfig.js";

class CourseService {
  async getCoursesType() {
    return fetchData(`${API_BASE_URL}/courses`);
  }

  async getCourseTitle(courseType) {
    return fetchData(`${API_BASE_URL}/courses/title?courseType=${courseType}`);
  }

  async getCourseProgram(courseId) {
    return fetchData(`${API_BASE_URL}/courses/title/program?courseId=${courseId}`);
  }
}

const courseService = new CourseService();

export default courseService;