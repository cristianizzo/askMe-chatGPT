import {Injectable} from '@angular/core';
import {NgForage} from 'ngforage';

@Injectable()
export class LocalForageService {
  constructor(
    private readonly ngf: NgForage
  ) {
  }

  public async getItem(key: string): Promise<any> {
    return this.ngf.getItem(key);
  }

  public async setItem(key: string, data: any): Promise<any> {
    return this.ngf.setItem(key, data);
  }

  public async removeItem(key: string): Promise<any> {
    return this.ngf.removeItem(key);
  }
}
