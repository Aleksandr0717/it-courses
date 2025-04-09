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

export interface IContent extends INavMenu {
  description: string
  img: string
}

export interface ICourseInfo extends IContent {
  authors: string
  price: string
  priceColor: string
  level: string
  levelColor: string
}
