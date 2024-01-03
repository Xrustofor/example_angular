export interface IDrawerItems{
  text: string,
  icon?: string,
  id: number,
  selected?: boolean
  url: string,
  items?: IDrawerItems[],
  menuStatus?: {
    default: boolean,
    value: boolean
  },
}
