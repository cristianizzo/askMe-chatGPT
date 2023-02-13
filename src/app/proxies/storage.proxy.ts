import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {LocalForageService} from "@services/localforage.service";

@Injectable()
export class StorageProxy {

  constructor(
    private localForage: LocalForageService
  ) {
  }

  public async init() {
    const token = this.get('token');
    if (!token && environment.apiKeyOpenAI) {
      await this.save('token', environment.apiKeyOpenAI);
    }

    await this._initStorage();
  }

  public async save(key: string, data: any): Promise<string> {
    if (environment.isExtension) {

    }

    return this.localForage.setItem(key, data);
  }

  public async get(key: string): Promise<any> {

    if (environment.isExtension) {

    }

    return this.localForage.getItem(key);
  }

  public async destroy(key: string): Promise<any> {
    if (environment.isExtension) {

    }

    return this.localForage.removeItem(key);
  }

  private async _initStorage() {
    const conversations = await this.get('conversations');
    if (!conversations) {
      await this.save('conversations', {});
    }
  }
}
