import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UtilsHelper} from '@helpers/utils';
import {SweetAlertHelper} from '@helpers/sweetalert2';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    UtilsHelper,
    SweetAlertHelper,
  ],
  exports: []
})

export class NgAskMeHelpersModule {
}
