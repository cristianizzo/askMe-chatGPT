import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ConversationProxy} from '@proxies/conversation.proxy';
import {StorageProxy} from '@proxies/storage.proxy';

export {ConversationProxy, StorageProxy};

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    ConversationProxy,
    StorageProxy,
  ],
  exports: []
})

export class NgAskMeProxiesModule {
}
