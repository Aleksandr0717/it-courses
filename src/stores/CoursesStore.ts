import type { ICourseInfo, ICourseProgram, ICourseType } from "@/interfaces";
import { defineStore } from "pinia";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

export const useCoursesStore = defineStore('coursesStore', () => {
  const courseService: any = inject('courseService')
  const router = useRouter()
  const alertMessage = ref({})
  
  const GET_COURSES_TYPE = async (): Promise<ICourseType[] | any> => {
    try {
      const response = await courseService.getCoursesType();
      return response.map((courseTypeCard: ICourseType) => ({
        ...courseTypeCard,
        action: () => router.push({ name: 'Courses', params: { lang: courseTypeCard.to } }),
      }));
    } catch (error: any) {
      console.error('Ошибка при получении данных: ', error.message);
    }
  }

  const GET_COURSES_TITLE = async (courseType: string): Promise<ICourseInfo[] | any> => {
    try{
      const response: ICourseInfo[] = await courseService.getCourseTitle(courseType)
      return response.map((courseTitleCard: ICourseInfo) => ({
        ...courseTitleCard,
        action: () => {
          router.push({ name: 'Course', params: { id: courseTitleCard.customId }, hash: '#' + courseTitleCard.id })
        }
      }))
    } catch (error: any) {
      console.error('Ошибка при получении списка курсов: ', error.message);
    }
  }

  const GET_COURSE_PROGRAM = async (courseId: number): Promise<ICourseProgram | any> => {
    try {
      const response: ICourseProgram[] = await courseService.getCourseProgram(courseId);
      return response.map((courseProgram: ICourseProgram) => {
        const reformateResponse: any = {}
        for (const key of Object.keys(courseProgram)) {
          if (typeof courseProgram[key] === 'object' && courseProgram[key]?.length === 1) {
            reformateResponse[key] = courseProgram[key][0] 
          } else if (typeof courseProgram[key] === 'string' && courseProgram[key].includes('\n')) {
            reformateResponse[key] = courseProgram[key].split('\n')
          } else {
            reformateResponse[key] = courseProgram[key]
          }
        }
        return {...reformateResponse}
      })[0]
    } catch (error: any) {
      console.error('Ошибка при получении программы курса: ', error.message);
    }
  }
  
  const UPDATE_COURSE_TITLE = async (courseTitle: ICourseInfo) => {
    const coursePayload = {
      id: courseTitle.customId,
      fields: {
        Title: courseTitle.title,
        Authors: courseTitle.authors,
        Img: courseTitle.img,
        Description: courseTitle.description,
        Price: courseTitle.price,
        Level: courseTitle.level,
      }
    }
    try {
      await courseService.updateCourseTitle(coursePayload)
      alertMessage.value = { type: 'info', message: 'Изменения сохранены'}
    } catch (error: any) {
      console.error('Ошибка при обновлении карты курса: ', error.message);
    } finally {
      setTimeout(() => {
        alertMessage.value = {}
      }, 3000)
    }
  }

  const DELETE_COURSE_TITLE = async (courseTitle: ICourseInfo) => {
    const coursePayload = {
      id: courseTitle.customId,
      fields: {
        Status: 'Deleted'
      }
    }
    try {
      await courseService.updateCourseTitle(coursePayload)
    } catch (error: any) {
      console.error('Ошибка при удалении карты курса: ', error.message);
    }
  }

  return {
    alertMessage,
    GET_COURSES_TYPE,
    GET_COURSES_TITLE,
    GET_COURSE_PROGRAM,
    UPDATE_COURSE_TITLE,
    DELETE_COURSE_TITLE
  }
})