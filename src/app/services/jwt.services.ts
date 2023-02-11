import {Injectable} from '@angular/core';
import {UtilsHelper} from '@helpers/utils';
import {environment} from "@env/environment";

declare const window: any;

@Injectable()
export class JwtService {

  constructor(
    private utilsHelper: UtilsHelper,
  ) {
  }

  public init() {
    const token = this.get('token');
    if (!token && environment.apiKeyOpenAI) {
      this.save('token', environment.apiKeyOpenAI);
    }
  }

  public save(key: string, data: any): string {
    window.localStorage.setItem(key, data);
    return data;
  }

  public get(key: string): string | null {
    const data = window.localStorage.getItem(key);
    return this.utilsHelper.notNull(data) ? data : null;
  }

  public destroy(key: string): void {
    window.localStorage.removeItem(key);
  }
}
