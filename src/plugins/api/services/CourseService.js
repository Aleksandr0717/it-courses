import { API_BASE_URL, fetchData } from "../apiConfig.js";

class CourseService {
  async getCoursesType() {
    return fetchData(`${API_BASE_URL}/courses`);
  }

  async getCourseTitle() {
    return fetchData(`${API_BASE_URL}/courses/title`);
  }
}

const courseService = new CourseService();

export default courseService;