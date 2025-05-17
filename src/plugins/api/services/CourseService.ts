import { API_BASE_URL, fetchData } from "../apiConfig";

class CourseService {
  async getCoursesType() {
    return fetchData(`${API_BASE_URL}/courses`);
  }

  async getCourseTitle(courseType: string) {
    return fetchData(`${API_BASE_URL}/courses/title/filtered?courseType=${courseType}`);
  }

  async getCourseProgram(courseId: number) {
    return fetchData(`${API_BASE_URL}/courses/title/program?courseId=${courseId}`);
  }

  async updateCourseTitle(coursePayload: {}) {
    return fetchData(`${API_BASE_URL}/courses/title`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coursePayload),
    });
  }
}

const courseService = new CourseService();

export default courseService;