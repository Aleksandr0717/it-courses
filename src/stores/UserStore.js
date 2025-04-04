import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '../plugins/api/services/UsersService'

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref({})

  const SET_CURRENT_USER = (payload) => {
    currentUser.value = payload
  }

  const INIT_CURRENT_USER = async (userId) => {
    await userService
      .getUserById(userId)
      .then((response) => {
        response.fullShortName = response.lastName + ' ' + response.name[0] + '.' + response.secondName[0] + '.'
        SET_CURRENT_USER(response)
      })
      .catch((error) => {
        console.error(error)
        alert('Ошибка авторизации')
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
        alert('Ошибка авторизации')
      })
  }

  const INIT_CREATE_NEW_USER = async (userData) => {
    await userService
      .createUser({
        Name: '',
        LastName: '',
        SecondName: '',
        Login: userData.login,
        Password: userData.password,
        Email: userData.email,
      })
      .then((response) => {
        alert(response.message);
      })
      .catch((error) => {
        console.error(error);
        alert('Ошибка регистрации');
      });
  };

  const INIT_LOGOUT = async () => {
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
    INIT_LOGOUT,
  }
})
