import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConversationProxy} from "@proxies/conversation.proxy";
import {Router} from "@angular/router";
import {LocalStorageService} from "@services/localstorage.service";
import {SweetAlertHelper} from '@helpers/sweetalert2';

@Component({
  selector: 'app-page-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class PageTokenComponent implements OnInit {

  public formObj: FormGroup;
  public token: string;

  constructor(
    private formBuilder: FormBuilder,
    private conversationProxy: ConversationProxy,
    private localStorageService: LocalStorageService,
    private router: Router,
    private alertHelper: SweetAlertHelper,
  ) {
    this.formObj = this.formBuilder.group({
      token: ['', Validators.compose([
        Validators.minLength(44),
        Validators.required,
      ])],
    });
  }

  async ngOnInit() {
    this.token = await this.localStorageService.getItem('askMeTT');
    if (this.token) {
      this.formObj.controls['token'].patchValue(this.token);
      this.formObj.controls['token'].markAsTouched();
      this.formObj.updateValueAndValidity();
    }
  }

  async submit() {
    const rawForm = this.formObj.getRawValue();
    this.localStorageService.setItem('askMeTT', rawForm.token);

    this.conversationProxy.ask('Which day is today').subscribe({
      next: async () => {
        await this.router.navigate(['/chat']);
      },
      error: async () => {
        this.localStorageService.removeItem('askMeTT');
        this.alertHelper.sweetalert.fire({
          title: 'Error',
          text: 'Token is not valid!',
          icon: 'error',
        });
      }
    });
  }
}
