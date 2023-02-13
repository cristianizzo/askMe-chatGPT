import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConversationProxy} from "@proxies/conversation.proxy";
import {Router} from "@angular/router";
import {LocalStorageService} from "@services/localstorage.service";

@Component({
  selector: 'app-page-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class PageTokenComponent {

  public formObj: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private conversationProxy: ConversationProxy,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.formObj = this.formBuilder.group({
      token: ['', Validators.compose([
        Validators.minLength(44),
        Validators.required,
      ])],
    });
  }

  async submit() {
    const rawForm = this.formObj.getRawValue();
    this.localStorageService.setItem('token', rawForm.token);

    this.conversationProxy.ask('Which day is today').subscribe({
      next: async (_) => {
        await this.router.navigate(['/chat']);
      },
      error: async (error) => {
        this.localStorageService.removeItem('token');
        console.log(error);
      }
    });
  }
}
