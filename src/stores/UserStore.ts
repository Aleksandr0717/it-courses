import { defineStore } from 'pinia'
import type { ICourseProgram, IUserInfo } from '@/interfaces'
import type { GenericObject } from 'vee-validate'
import { inject, ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const userService: any = inject('userService')
  const currentUser = ref<IUserInfo | object>({})
  const isLoading = ref(false)
  const alertMessage = ref({})

  const SET_CURRENT_USER = (payload: IUserInfo | object): void => {
    currentUser.value = payload
  }

  const INIT_CURRENT_USER = async (userId: number): Promise<void> => {
    isLoading.value = true
    try {
      const response: IUserInfo = await userService.getUserById(userId)

      if (response.name && response.lastName && response.secondName) {
        response.fullShortName =
          response.lastName[0].toUpperCase() + response.lastName.slice(1) + ' ' + response.name[0].toUpperCase() + '.' + response.secondName[0].toUpperCase() + '.'
      } else if (response.name && response.lastName) {
        response.fullShortName =
          response.lastName[0].toUpperCase() + response.lastName.slice(1) + ' ' + response.name[0].toUpperCase() + '.'
      } else response.fullShortName = '@' + response.login
      
      SET_CURRENT_USER(response)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      isLoading.value = false
    }
  }

  const INIT_AUTORIZATION = async (userInfo: GenericObject, rememberUser: boolean): Promise<void> => {
    try {
      const response = await userService.authorizationUser(userInfo.loginUsername, userInfo.loginPassword)
      if (rememberUser) {
        localStorage.setItem('currentUser', JSON.stringify(response.user.id))
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(response.user.id))
      }
      alertMessage.value = { type: 'success', message: response.message}
      INIT_CURRENT_USER(response.user.id)
    } catch (error: any) {
      console.error(error.message)
      alertMessage.value = { type: 'error', message: 'Неверный логин или пароль'}
    } finally {
      setTimeout(() => {
        alertMessage.value = {}
      }, 3000)
    }
  }

  const INIT_CREATE_NEW_USER = async (userData: GenericObject): Promise<void> => {
    const userPayload = {
      fields: {
        Name: '',
        LastName: '',
        SecondName: '',
        Login: userData.regUsername,
        Password: userData.regPassword,
        Email: userData.regEmail,
        City: '',
        Education: '',
        AboutMe: '',
      } 
    }
    try {
      const response = await userService.createUser(userPayload)
      alertMessage.value = { type: 'success', message: response.message}
    } catch (error: any) {
      console.error('Ошибка при создании пользователя: ', error.message)
    } finally {
      setTimeout(() => {
        alertMessage.value = {}
      }, 3000)
    }
  }
  
  const INIT_UPDATE_USER_DATA = async (userData: GenericObject): Promise<void> => {
    const userPayload = {
      id: userData.customId,
      fields: {
        Name: userData.name || '',
        LastName: userData.lastName || '',
        SecondName: userData.secondName || '',
        Password: userData.password,
        Email: userData.email,
        City: userData.city || '',
        Education: userData.education || '',
        AboutMe: userData.aboutMe || '',
      }
    }
    try {
      await userService.updateUserData(userPayload)
      alertMessage.value = { type: 'info', message: 'Изменения сохранены'}
    } catch (error: any) {
      console.error('Ошибка при обновлении данных пользователя: ', error.message)
    } finally {
      setTimeout(() => {
        alertMessage.value = {}
      }, 3000)
    }
  }

  const INIT_DELETE_USER = async (userData: IUserInfo): Promise<void> => {
    const userPayload = {
      id: userData.customId,
      fields: {
        Status: 'Deleted'
      }
    }
    try {
      await userService.updateUserData(userPayload)
    } catch (error: any) {
      console.error('Ошибка при удалении пользователя: ', error.message)
    } 
  };

  const INIT_LOGOUT = (): void => {
    if (localStorage.getItem('currentUser')) localStorage.removeItem('currentUser') 
    else sessionStorage.removeItem('currentUser')
    SET_CURRENT_USER({})
  }

  const SIGN_UP_FOR_COURSE = async (userData: IUserInfo, courseProgram: ICourseProgram) => {
    const userPayload = {
      id: userData.customId,
      fields: {
        Courses: courseProgram.title
      }
    } 
    try {
      await userService.updateUserData(userPayload)
      alert('Вы записались на курс')
    } catch (error: any) {
      console.error('Ошибка при записи на курс: ', error.message)
    }
  }

  return {
    currentUser,
    isLoading,
    alertMessage,
    SET_CURRENT_USER,
    INIT_CREATE_NEW_USER,
    INIT_CURRENT_USER,
    INIT_AUTORIZATION,
    INIT_UPDATE_USER_DATA,
    INIT_DELETE_USER,
    INIT_LOGOUT,
    SIGN_UP_FOR_COURSE
  }
})
