export interface INavList {
  id: number
  title: string
  color?: string
}

export interface INavMenu extends INavList {
  icon?: string
  action: () => void 
}

export interface INavLink extends INavList {
  to: object
  addClass?: boolean
  action?: () => void
}

export interface ICourseType extends INavMenu {
  description: string
  img: string
  to: string
  courseTitleId: string[]
}

export interface ICourseInfo extends ICourseType {
  authors: string
  price: string
  level: string
  courseTypeTitle: string[]
  customId: string
  courseType: string[]
  status: string
}

interface IResponse {
  id: number
  customId: string
}

export interface IUserInfo extends IResponse {
  lastName: string
  name: string
  secondName: string
  login: string
  password: string
  email: string
  city: string
  education: string
  aboutMe: string
  courses: string[]
  title: string[] 
  role: string
  status: string
}

export interface ICourseProgram extends IResponse {
  courseId: string
  title: string
  img: string
  description: string
  skills: string[]
  includes: string[]
  about: string
  requirements: string
  price: string
  level: string
  program: string[]
}

export interface IAlert {
  type: string
  message: string
}

export interface IProgramDesc {
  title: string
  desc: string[]
}