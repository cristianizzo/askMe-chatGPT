import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable()
export class UtilsHelper {

  public handleError(error: HttpErrorResponse): Observable<any> {
    const Error = error.error;
    return throwError(Error);
  }

  public notNull(value: any): boolean {

    return (value && value !== undefined && value !== null);
  }
}

