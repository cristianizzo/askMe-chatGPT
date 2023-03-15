import {Injectable} from '@angular/core';
import {UtilsHelper} from "@helpers/utils";
import {map, Observable} from "rxjs";
import {ConversationModel} from "@app/models";
import {StorageProxy} from "@proxies/storage.proxy";
import {ChatGptService} from "@services/chatgpt.service";

@Injectable()
export class ConversationProxy {

  constructor(
    private utilsHelper: UtilsHelper,
    private storageProxy: StorageProxy,
    private chatGptService: ChatGptService,
  ) {
  }

  public ask(message: string): Observable<string> {
    return this.chatGptService.postMessage(message)
      .pipe(map(message => message));
  }

  public askQuestion(prompt: string): Observable<string> {
    return this.chatGptService.postMessage(prompt)
      .pipe(map((message) => message));
  }

  public async getHistory(): Promise<any> {
    return this.storageProxy.get('conversations');
  }

  public async getConversation(sessionId: number): Promise<any> {
    const conversations = await this.storageProxy.get('conversations');

    if (!conversations[sessionId]) {
      return null;
    }

    return conversations[sessionId];
  }

  public async saveConversation(sessionId: number, conversation: ConversationModel): Promise<any> {
    const conversations = await this.storageProxy.get('conversations');

    if (!conversations[sessionId]) {
      conversations[sessionId] = [];
    }

    conversations[sessionId].push(conversation);
    await this.storageProxy.save('conversations', conversations);

    return true;
  }

  public async deleteConversation(sessionId: number): Promise<any> {
    const conversations = await this.storageProxy.get('conversations');

    if (conversations[sessionId]) {
      delete conversations[sessionId];
      await this.storageProxy.save('conversations', conversations);
    }

    return true;
  }
}
