import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate',
  pure: false
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, format: string = 'YYYY-MM-DD'): string {
    if (!value) {
      return '';
    }

    return moment(value).format(format);
  }
}
