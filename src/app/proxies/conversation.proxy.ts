import {Injectable} from '@angular/core';
import {UtilsHelper} from "@helpers/utils";
import {map, Observable} from "rxjs";
import {ConversationModel, ENUM_FROM, PayloadMessageModel} from "@app/models";
import {StorageProxy} from "@proxies/storage.proxy";
import {OpenAIService} from "@services/openai.service";

@Injectable()
export class ConversationProxy {

  constructor(
    private utilsHelper: UtilsHelper,
    private storageProxy: StorageProxy,
    private openAIService: OpenAIService,
  ) {
  }

  public parseChatPayload(conversations: ConversationModel[], message: string): PayloadMessageModel[] {
    const messages = [];

    // Add the two last messages from the conversations list, if available.
    const messageLng = 5;
    for (let i = Math.max(conversations.length - messageLng, 0); i < conversations.length; i++) {
      const history = conversations[i];
      const role = history.from === ENUM_FROM.ME ? 'user' : 'assistant';
      messages.push({role, content: history.message});
    }

    // Add the current user's message.
    messages.push({role: 'user', content: message});

    return messages;
  }

  public createTextCompletions(prompt: string): Observable<string> {
    return this.openAIService.createTextCompletions(prompt)
      .pipe(map((message) => message));
  }

  public createChatCompletions(messages: PayloadMessageModel[]): Observable<string> {
    return this.openAIService.createChatCompletions(messages)
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
