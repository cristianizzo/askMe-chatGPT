import {EnvService} from '@services/config.service';
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvModel} from '@app/models';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UtilsHelper} from '@helpers/utils';
import {LocalStorageService} from '@services/localstorage.service';

@Injectable()
export class APIService {

  constructor(
    @Inject(EnvService) private global: EnvModel,
    private utilsHelper: UtilsHelper,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {

    if (!this.global) {
      throwError('Missing Env Variables');
    }
  }

  public get(path: string): Observable<any> {
    return this.http.get(`${this.global.openai.uri}${path}`, this.getOpts())
      .pipe(catchError(this.utilsHelper.handleError));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${this.global.openai.uri}${path}`, body, this.getOpts())
      .pipe(catchError(this.utilsHelper.handleError));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${this.global.openai.uri}${path}`, body, this.getOpts())
      .pipe(catchError(this.utilsHelper.handleError));
  }

  public delete(path: string, body: object = {}): Observable<any> {
    const opts = this.getOpts();
    return this.http.delete(`${this.global.openai.uri}${path}`, {...opts, body})
      .pipe(catchError(this.utilsHelper.handleError));
  }

  private getOpts(): any {
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getItem('askMeTT')}`)
    };
  }
}
