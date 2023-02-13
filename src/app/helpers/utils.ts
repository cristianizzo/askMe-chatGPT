import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import moment from "@helpers/moment";

@Injectable()
export class UtilsHelper {

  public getRandomId(): number {
    return moment().valueOf();
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    const Error = error.error;
    return throwError(Error);
  }

  public notNull(value: any): boolean {

    return (value && value !== undefined && value !== null);
  }

  public objectHasValue(value: any): boolean {
    try {
      return value && value === Object(value) && Object.keys(value).length > 0;
    } catch (e) {
      return false;
    }
  }

  arrayHasValue(array: any): boolean {
    if (!array) {
      return false;
    }

    try {
      return array && Array.isArray(array) && array.length > 0;
    } catch (e) {
      return false;
    }
  }

  stringHasValue(value: string): boolean {
    if (!value) {
      return false;
    }
    try {
      return !!value && Object.prototype.toString.call(value) === '[object String]' && value.length > 0;
    } catch (error) {
      return false;
    }
  }

  public async async(fun: any) {
    try {
      const result = await fun();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

