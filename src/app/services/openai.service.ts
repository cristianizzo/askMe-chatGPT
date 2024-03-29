import {Injectable} from '@angular/core';
import {APIService} from "@services/api.service";
import {environment} from "@env/environment";
import {UtilsHelper} from "@helpers/utils";
import {PayloadMessageModel} from "@app/models";
import {map, Observable} from "rxjs";
import logger from '@app/app.logger';

const logContent = logger.logContent('services:openai');

@Injectable()
export class OpenAIService {

  private opts = {};

  constructor(
    private utilsHelper: UtilsHelper,
    private apiService: APIService,
  ) {
  }

  public createTextCompletions(prompt: string): Observable<string> {
    return this.apiService.post('/v1/completions', this.payloadTextCompletions(prompt))
      .pipe(map(data => this.parseMessage(data)));
  }

  public createChatCompletions(messages: PayloadMessageModel[]): Observable<string> {
    return this.apiService.post('/v1/chat/completions', this.payloadChat(messages))
      .pipe(map(data => this.parseMessage(data)));
  }

  public createImages(prompt: string, n = 1, size = '1024x1024'): Observable<{ url: string }[]> {
    return this.apiService.post('/v1/images/generations', {
      prompt,
      n,
      size,
      response_format: 'url'
    })
      .pipe(map(data => this.parseMessage(data)));
  }

  private parseMessage(response: any): any {
    if (
      this.utilsHelper.arrayHasValue(response.choices) &&
      this.utilsHelper.stringHasValue(response.choices[0].text)
    ) {
      return response.choices[0].logprobs.tokens.join(''); // array of string
      // return response.choices[0].text; plan text
    } else if (
      this.utilsHelper.arrayHasValue(response.choices) &&
      response.choices[0].message &&
      this.utilsHelper.stringHasValue(response.choices[0].message.content)
    ) {
      return response.choices[0].message.content;
    } else if (response.data) {
      return response.data;
    } else {
      logger.warn(
        logContent.add({
          info: 'warn unhandled response',
        })
      );
      return '';
    }
  }

  private payloadTextCompletions(prompt: string) {
    return Object.assign(this.opts, {
      best_of: 1,
      echo: false,
      frequency_penalty: 0,
      logprobs: 0,
      max_tokens: 256,
      presence_penalty: 0,
      prompt: null,
      stream: false,
      temperature: 0.95,
      top_p: 1,
      model: environment.openai.textModel
    }, {prompt})
  }

  private payloadChat(messages: PayloadMessageModel[]) {
    return Object.assign(this.opts, {
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: false,
      n: 1,
      model: environment.openai.chatModel
    }, {messages})
  }

}
