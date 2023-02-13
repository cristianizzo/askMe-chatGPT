import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import moment from '@helpers/moment';

@Pipe({
  name: 'appDateFormat',
})
export class DateFormatPipe implements PipeTransform {

  public transform(value: string, mini: boolean = false) {
    console.log(value)
    const newValueMm = moment(value).valueOf();
    let newValue: string | null = value;

    const dif = Math.floor((Date.now() - newValueMm) / 1000 / 86400);

    if (dif > 1) {
      const datePipe = new DatePipe('en-US');

      if (mini) {
        newValue = datePipe.transform(value, 'dd MMM yyyy');
      } else {
        newValue = datePipe.transform(value, 'HH:mm - E, dd MMM yyyy');
      }

      return newValue;
    } else {
      return this.convertToNiceDate(value);
    }
  }

  private convertToNiceDate(time: string) {
    const date = new Date(time);
    const diff = (new Date().getTime() - date.getTime()) / 1000;
    const dayDiff = Math.floor(diff / 86400);

    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
      return '';
    }

    return (
      (dayDiff === 0 &&
        ((diff < 60 && 'Just now') ||
          (diff < 120 && '1 min ago') ||
          (diff < 3600 && Math.floor(diff / 60) + ' min ago') ||
          (diff < 7200 && '1 hour ago') ||
          (diff < 86400 && Math.floor(diff / 3600) + ' hours ago'))) ||
      (dayDiff === 1 && 'Yesterday') ||
      (dayDiff < 7 && dayDiff + ' days ago') ||
      (dayDiff < 31 && Math.ceil(dayDiff / 7) + ' week(s) ago')
    );
  }
}
