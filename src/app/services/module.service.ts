import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EnvModel} from '@app/models';
import {EnvService} from '@services/config.service';
import {APIService} from '@services/api.service';
import {Interceptor} from '@services/interceptor.service';
import {OpenAIService} from '@services/openai.service';
import {LocalForageService} from '@services/localforage.service';
import {LocalStorageService} from '@services/localstorage.service';
import {DEFAULT_CONFIG, Driver, NgForageOptions} from 'ngforage';

export {OpenAIService, LocalForageService, LocalStorageService};

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
        OpenAIService,
        LocalForageService,
        LocalStorageService,
        APIService,
        {
          provide: DEFAULT_CONFIG,
          useValue: {
            name: 'askMe',
            version: 1,
            driver: [
              Driver.INDEXED_DB,
              Driver.LOCAL_STORAGE,
            ],
          } as NgForageOptions,
        },
        {provide: EnvService, useValue: environment}
      ]
    };
  }
}
