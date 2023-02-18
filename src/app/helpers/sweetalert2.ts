import {Injectable} from '@angular/core';
import sweetalert2 from 'sweetalert2';

@Injectable()
export class SweetAlertHelper {
  public sweetalert = sweetalert2.mixin({});
}
