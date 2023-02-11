import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageTokenComponent} from "@pages/token/token.component";
import {PageChatComponent} from "@pages/chat/chat.component";
import {AuthGuard} from "@app/app.auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: PageChatComponent,
    canActivate: [AuthGuard],
    data: {auth: true},
  },
  {
    path: 'token',
    component: PageTokenComponent,
    canActivate: [AuthGuard],
    data: {auth: false},
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
