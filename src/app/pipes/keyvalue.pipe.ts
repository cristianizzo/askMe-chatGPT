import {KeyValue} from '@angular/common';
import {Pipe} from "@angular/core";

@Pipe({
  name: 'appKeyValue',
})
export class KeyValuePipe {
  private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }
}
