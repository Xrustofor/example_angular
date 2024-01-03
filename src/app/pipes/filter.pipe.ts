import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class filterPipe implements PipeTransform {

  transform<T>(items: any[], search: string = '', field: string = '' ): T[] {
    if (!search) { return items }
    if (!search.trim()) { return items }
    if(!field){ return items }
    if(!Array.isArray(items)){ return [] }

    const data = items.filter(item => {
      if(item[field] === 'undefined'){ return false }
      return String(item[field])
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
    })

    return data as T[];
  }
}
