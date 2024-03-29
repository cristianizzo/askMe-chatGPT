import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageTokenComponent} from '@pages/token/token.component';
import {PageChatComponent} from '@pages/chat/chat.component';
import {AuthGuard} from '@app/app.auth.guard';
import {PageImageComponent} from '@pages/image/image.component';

export const routes: Routes = [
  {
    path: 'token',
    component: PageTokenComponent,
    canActivate: [AuthGuard],
    data: {auth: false},
  },
  {
    path: 'chat',
    component: PageChatComponent,
    canActivate: [AuthGuard],
    data: {auth: true},
  },
  {
    path: 'chat/:sessionId',
    component: PageChatComponent,
    canActivate: [AuthGuard],
    data: {auth: true},
  },
  {
    path: 'images',
    component: PageImageComponent,
    canActivate: [AuthGuard],
    data: {auth: true},
  },
  {
    path: '**',
    redirectTo: '/chat',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
