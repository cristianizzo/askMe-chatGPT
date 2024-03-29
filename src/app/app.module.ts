import {environment} from '@env/environment';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgAskMePipesModule} from '@pipes/module.pipe';
import {NgAskMeHelpersModule} from '@helpers/module.helpers';
import {NgAskMeServicesModule} from '@services/module.service';
import {NgAskMeProxiesModule} from '@proxies/module.proxy';
import {PageTokenComponent} from '@pages/token/token.component';
import {PageChatComponent} from '@pages/chat/chat.component';
import {PageImageComponent} from '@pages/image/image.component';
import {AuthGuard} from '@app/app.auth.guard';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {ToolbarModule} from '@components/toolbar/toolbar.module';
import {HistoryComponent} from '@components/history/history.component';
import {ChatConversationComponent} from '@components/chat-conversation/chat-conversation.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    PageTokenComponent,
    PageChatComponent,
    PageImageComponent,
    HistoryComponent,
    ChatConversationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgAskMePipesModule,
    NgAskMeHelpersModule,
    NgAskMeProxiesModule,
    NgAskMeServicesModule.forRoot(environment),
    MatInputModule,
    MatListModule,
    ToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
