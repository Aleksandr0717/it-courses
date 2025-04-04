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

  const INIT_AUTORIZATION = async (usersInfo) => {
    await userService
      .authorizationUser(usersInfo.login, usersInfo.password)
      .then((response) => {
        alert(response.message)
        localStorage.setItem('currentUser', JSON.stringify(response.user.id))
        INIT_CURRENT_USER(response.user.id)
      })
      .catch((error) => {
        console.error(error)
        alert('Ошибка авторизации')
      })
  }

  const INIT_LOGOUT = async () => {
    localStorage.removeItem('currentUser')
    SET_CURRENT_USER({})
  }

  return {
    currentUser,
    SET_CURRENT_USER,
    INIT_CURRENT_USER,
    INIT_AUTORIZATION,
    INIT_LOGOUT,
  }
})
