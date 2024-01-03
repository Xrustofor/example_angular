export interface IMetaPagination {
  current_page: number,
  from: number,
  last_page: number,
  per_page: number,
  to: number,
  total: number,
  links?: {
    active: boolean,
    label: string,
    url: string
  }[]
}
