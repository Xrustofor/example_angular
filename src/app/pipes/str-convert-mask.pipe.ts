import { Pipe, PipeTransform } from '@angular/core';
import { IPropertyString } from 'src/app/interfaces/global/global.interfaces';

@Pipe({
  name: 'strConvertMask',
  pure: false
})
export class strConvertMaskPipe implements PipeTransform {
  transform(item: IPropertyString | null | string, mask: string[] = [], separator: string = '-'): string {
    if (!item) { return '' }
    if (typeof item === "string") { return item }
    if (!Array.isArray(mask)) { return '' }
    if (mask.length === 0) { return '' }
    let str: string = ''
    for (let idx in mask) {

      if (item[mask[idx]]) { str += item[mask[idx]] }

      if ((mask.length - 1) > +idx) { str += separator }
    }
    return str;
  }
}
