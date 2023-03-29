import { Pipe, PipeTransform } from '@angular/core';
import { PersianCalendarService } from '../services/PersianCalenderService';

@Pipe({
  name: 'persianDate',
})
export class PersianDatePipe implements PipeTransform {
  constructor(public persianCalendarService: PersianCalendarService) {}
  /*
    Takes a value and convert it to
   */
  transform(value: string) {
    let d = new Date(value);
    return this.persianCalendarService.PersianCalendar(d);
  }
}
