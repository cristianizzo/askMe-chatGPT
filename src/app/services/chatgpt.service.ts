import {Injectable} from '@angular/core';
import {APIService} from "@services/api.service";
import {environment} from "@env/environment";
import {UtilsHelper} from "@helpers/utils";
import {map, Observable} from "rxjs";

@Injectable()
export class ChatGptService {

  private opts = {
    best_of: 1,
    echo: true,
    frequency_penalty: 0,
    logprobs: 0,
    max_tokens: 256,
    presence_penalty: 0,
    prompt: null,
    stream: false,
    temperature: 0.95,
    top_p: 1,
    model: environment.modelOpenAI
  }

  constructor(
    private utilsHelper: UtilsHelper,
    private apiService: APIService,
  ) {
  }

  public postMessage(prompt: string): Observable<string> {
    return this.apiService.post('', Object.assign(this.opts, {prompt}))
      .pipe(map(data => this.parseMessage(data)));
  }

  private parseMessage(response: any): string {
    if (
      this.utilsHelper.arrayHasValue(response.choices) &&
      this.utilsHelper.stringHasValue(response.choices[0].text)
    ) {
      return response.choices[0].logprobs.tokens.join(''); // array of string
      // return response.choices[0].text; plan text
    } else {
      console.log('warn unhandled response', response);
      return '';
    }
  }
}
