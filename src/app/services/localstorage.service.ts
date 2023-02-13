import {Injectable} from '@angular/core';
import {UtilsHelper} from "@helpers/utils";

@Injectable()
export class LocalStorageService {
  constructor(
    private utilsHelper: UtilsHelper
  ) {
  }

  public getItem(key: string) {
    const data: any = window.localStorage.getItem(key);
    return this.utilsHelper.notNull(data) ? JSON.parse(data) : null;
  }

  public setItem(key: string, data: any) {
    window.localStorage.setItem(key, JSON.stringify(data));
    return data;
  }

  public removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}
