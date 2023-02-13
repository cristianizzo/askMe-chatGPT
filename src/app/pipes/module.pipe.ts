import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';
import {KeyValuePipe} from '@pipes/keyvalue.pipe';
import {DateFormatPipe} from '@pipes/dateFormat.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    KeyValuePipe,
    DateFormatPipe,
  ],
  exports: [
    KeyValuePipe,
    DateFormatPipe,
  ],
  providers: [DecimalPipe, DatePipe],
})
export class NgAskMePipesModule {
}
