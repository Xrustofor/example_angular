export interface INavigation {
  text: string,
  icon?: string,
  id: number,
  selected?: boolean
  url: string,
  items?: INavigation[],
  isDefaultUrl?: boolean,
  menuStatus?: {
    default: boolean,
    value: boolean
  },
}
