import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {from, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {EnvService} from '@services/config.services';
import {EnvModel} from '@app/models';
import {UtilsHelper} from '@helpers/utils';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private utilsHelper: UtilsHelper,
    @Inject(EnvService) private config: EnvModel,
  ) {

    if (!this.config) {
      throwError('Missing Env Variables');
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone();
    return next.handle(xhr).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
      }),
      catchError(this.utilsHelper.handleError)
    ).toPromise();
  }
}
