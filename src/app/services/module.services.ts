import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {EnvModel} from '@app/models';
import {EnvService} from '@services/config.services';
import {APIService} from '@services/api.services';
import {JwtService} from '@services/jwt.services';
import {Interceptor} from '@services/interceptor.services';

export {JwtService};

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  declarations: [],
})

export class NgAskMeServicesModule {

  public static forRoot(environment: EnvModel): ModuleWithProviders<NgAskMeServicesModule> {

    return {
      ngModule: NgAskMeServicesModule,
      providers: [
        JwtService,
        APIService,
        {provide: EnvService, useValue: environment}
      ]
    };
  }
}
