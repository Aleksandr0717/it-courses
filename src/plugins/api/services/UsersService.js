import {API_BASE_URL, fetchData} from "../apiConfig.js";

class UserService {
  constructor() {
  }

  async getAllUsers() {
    console.log(`${API_BASE_URL}/users`);
    return fetchData(`${API_BASE_URL}/users`);
  }

  async authorizationUser(login, password) {
    return fetchData(`${API_BASE_URL}/users/login?login=${login}&password=${password}`);
  }

  async getUserById(userId) {
    return fetchData(`${API_BASE_URL}/users/${userId}`);
  }

  async createUser(userData) {
    return fetchData(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }

  async updateUserData(userData) {
    return fetchData(`${API_BASE_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }
}

// Класс для работы с API пользователей
const userService = new UserService(API_BASE_URL);

export default userService;