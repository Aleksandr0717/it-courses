import type { ICourseInfo, ICourseProgram, ICourseType } from "@/interfaces";
import { defineStore } from "pinia";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

export const useCoursesStore = defineStore('coursesStore', () => {
  const router = useRouter()
  const courseService: any = inject('courseService')
  const courseProgram = ref<ICourseProgram | object>({})

  const GET_COURSES_TYPE = async () => {
    try {
      const response = await courseService.getCoursesType();
      return response.map((courseTypeCard: ICourseType) => ({
        ...courseTypeCard,
        action: () => router.push({ name: 'Courses', params: { lang: courseTypeCard.to } }),
      }));
    } catch (error) {
      console.error('Ошибка при получении данных: ', error);
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
      console.error('Ошибка при получении списка курсов: ', error);
    }
  }

  const GET_COURSE_PROGRAM = async (courseId: number): Promise<void> => {
    try {
      const response: ICourseProgram[] = await courseService.getCourseProgram(courseId);
      courseProgram.value = response.map((courseProgram: ICourseProgram) => {
        const reformateResponse: any = {}
        for (const key of Object.keys(courseProgram)) {
          if (typeof courseProgram[key] === 'object' && courseProgram[key]?.length === 1) {
            reformateResponse[key] = courseProgram[key][0] 
          } else {
            reformateResponse[key] = courseProgram[key]
          }
        }
        return {...reformateResponse}
      })[0]
    } catch (error: any) {
      console.error('Ошибка при получении программы курса: ', error);
    }
  }
  
  const CLEAR_COURSE_PROGRAM = (): void => {
    courseProgram.value = [] 
  }

  return {
    GET_COURSES_TYPE,
    GET_COURSES_TITLE,
    GET_COURSE_PROGRAM,
    CLEAR_COURSE_PROGRAM,
    courseProgram
  }
})