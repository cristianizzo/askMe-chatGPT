import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';
import {DateFormatPipe} from '@pipes/dateFormat.pipe';
import {FilterPipe} from '@pipes/filter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DateFormatPipe,
    FilterPipe,
  ],
  exports: [
    DateFormatPipe,
    FilterPipe,
  ],
  providers: [DecimalPipe, DatePipe],
})
export class NgAskMePipesModule {
}
