import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '../plugins/api/services/UsersService.js'

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref({})

  const SET_CURRENT_USER = (payload) => {
    currentUser.value = payload
  }

  const INIT_CURRENT_USER = async (userId) => {
    await userService
      .getUserById(userId)
      .then((response) => {
        if (response.name && response.lastName && response.secondName) {
          response.fullShortName =
            response.lastName[0].toUpperCase() + response.lastName.slice(1) + ' ' + response.name[0].toUpperCase() + '.' + response.secondName[0].toUpperCase() + '.'
        } else response.fullShortName = response.login
        SET_CURRENT_USER(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const INIT_AUTORIZATION = async (usersInfo, rememberUser) => {
    await userService
      .authorizationUser(usersInfo.login, usersInfo.password)
      .then((response) => {
        alert(response.message)
        if (rememberUser) {
          localStorage.setItem('currentUser', JSON.stringify(response.user.id))
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(response.user.id))
        }
        INIT_CURRENT_USER(response.user.id)
      })
      .catch((error) => {
        console.error(error)
        alert('Неверный логин или пароль')
      })
  }

  const INIT_CREATE_NEW_USER = async (userData) => {
    try {
      const userPayload = {
        fields: {
          Name: '',
          LastName: '',
          SecondName: '',
          Login: userData.login,
          Password: userData.password,
          Email: userData.email,
          City: '',
          Education: '',
          AboutMe: '',
        } 
      }
      const response = await userService.createUser(userPayload);
      alert(response.message);
      return response;
    } catch (error) {
      console.error('Ошибка при создании пользователя: ', error.message);
      alert(error.message);
    }
  };
  
  const INIT_UPDATE_USER = async (userData) => {
    try {
      const userPayload = {
        id: userData.customId,
        fields: {
          Name: userData.name || '',
          LastName: userData.lastName || '',
          SecondName: userData.secondName || '',
          Login: userData.login,
          Password: userData.password,
          Email: userData.email,
          City: userData.city || '',
          Education: userData.education || '',
          AboutMe: userData.aboutMe || '',
        }
      }
      const response = await userService.updateUserData(userPayload);
      alert(response.message);
      return response;
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя: ', error.message);
      alert(error.message);
    }
  };

  const INIT_DELETE_USER = async (userData) => {
    try {
      const response = await userService.deleteUser(userData);
      alert(response.message);
      return response;
    } catch (error) {
      console.error('Ошибка при удалении пользователя: ', error.message);
      alert(error.message);
    }
  };

  const INIT_LOGOUT = () => {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
    SET_CURRENT_USER({})
  }

  return {
    currentUser,
    SET_CURRENT_USER,
    INIT_CREATE_NEW_USER,
    INIT_CURRENT_USER,
    INIT_AUTORIZATION,
    INIT_UPDATE_USER,
    INIT_DELETE_USER,
    INIT_LOGOUT,
  }
})
