import {environment} from '@env/environment';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgAskMeHelpersModule} from '@helpers/module.helpers';
import {NgAskMeServicesModule} from '@services/module.services';
import {PageTokenComponent} from '@pages/token/token.component';
import {PageChatComponent} from '@pages/chat/chat.component';
import {AuthGuard} from '@app/app.auth.guard';
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {ToolbarModule} from '@components/toolbar/toolbar.module';
import { HistoryComponent } from './components/history/history.component';
import {MatIconModule} from "@angular/material/icon";
import { ChatConversationComponent } from './components/chat-conversation/chat-conversation.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    PageTokenComponent,
    PageChatComponent,
    HistoryComponent,
    ChatConversationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgAskMeHelpersModule,
    NgAskMeServicesModule.forRoot(environment),
    MatInputModule,
    MatListModule,
    ToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
