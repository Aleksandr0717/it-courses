import { API_BASE_URL, fetchData } from "../apiConfig";

class UserService {

  async getAllUsers() {
    return fetchData(`${API_BASE_URL}/users`);
  }

  async authorizationUser(login: string, password: string) {
    return fetchData(`${API_BASE_URL}/users/login?login=${login}&password=${password}`);
  }

  async getUserById(userId: number) {
    return fetchData(`${API_BASE_URL}/users/${userId}`);
  }

  async createUser(userData: {}) {
    return fetchData(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }

  async updateUserData(userData: {}) {
    return fetchData(`${API_BASE_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }
}

const userService = new UserService();

export default userService;