export interface IUserInfo {
  id: number
  customId: string
  lastName: string
  name: string
  secondName: string
  fullShortName: string
  login: string
  password: string
  email: string
  city: string
  education: string
  aboutMe: string
  status: string
}

export interface INavMenu {
  id: number
  title: string
  icon?: string
  action?: () => void
}

export interface ITabs extends INavMenu {
  color: string
}

export interface INavLink extends INavMenu {
  to: object
  addClass?: boolean,
}

export interface ICourseType extends INavMenu {
  description: string
  img: string
  to?: string
  courseTitleId: string[]
}

export interface ICourseInfo extends ICourseType {
  authors: string
  price: string
  level: string
  courseTypeTitle: string[]
  customId: string
  courseType: string[]
}
