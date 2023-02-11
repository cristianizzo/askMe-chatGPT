import {EnvService} from '@services/config.services';
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvModel} from '@app/models';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UtilsHelper} from "@helpers/utils";
import {JwtService} from "@services/jwt.services";

@Injectable()
export class APIService {

  constructor(
    @Inject(EnvService) private global: EnvModel,
    private utilsHelper: UtilsHelper,
    private http: HttpClient,
    private jwtService: JwtService,
  ) {

    if (!this.global) {
      throwError('Missing Env Variables');
    }
  }

  private getOpts(): any {
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.jwtService.get('token')}`)
    };
  }

  public get(path: string): Observable<any> {
    return this.http.get(`${this.global.uriOpenAI}${path}`, this.getOpts())
      .pipe(catchError(this.utilsHelper.handleError));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${this.global.uriOpenAI}${path}`, body, this.getOpts())
      .pipe(catchError(this.utilsHelper.handleError));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${this.global.uriOpenAI}${path}`, body, this.getOpts())
      .pipe(catchError(this.utilsHelper.handleError));
  }

  public delete(path: string, body: object = {}): Observable<any> {
    const opts = this.getOpts();
    return this.http.delete(`${this.global.uriOpenAI}${path}`, {...opts, body})
      .pipe(catchError(this.utilsHelper.handleError));
  }
}
