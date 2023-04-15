import {Injectable} from '@angular/core';
import {LocalForageService} from "@services/localforage.service";

@Injectable()
export class StorageProxy {

  constructor(
    private localForage: LocalForageService
  ) {
  }

  public async init() {
    await this._initStorage();
  }

  public async save(key: string, data: any): Promise<any> {
    return this.localForage.setItem(key, data);
  }

  public async get(key: string): Promise<any> {
    return this.localForage.getItem(key);
  }

  public async destroy(key: string): Promise<any> {
    return this.localForage.removeItem(key);
  }

  private async _initStorage() {
    const conversations = await this.get('conversations');
    if (!conversations) {
      await this.save('conversations', {});
    }
  }
}
