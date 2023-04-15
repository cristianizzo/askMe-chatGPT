import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OpenAIService} from "@services/openai.service";
import {SweetAlertHelper} from "@helpers/sweetalert2";
import {LocalStorageService} from "@services/localstorage.service";

@Component({
  selector: 'app-page-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class PageImageComponent implements OnInit {

  public formObj: FormGroup;
  public qtyList: number[];
  public sizeList: string[];
  public imageList: { url: string }[];

  constructor(
    private formBuilder: FormBuilder,
    private openAI: OpenAIService,
    private alertHelper: SweetAlertHelper,
    private localStorageService: LocalStorageService,
  ) {
    this.qtyList = [1, 2, 3, 4];
    this.sizeList = ['256x256', '512x512', '1024x1024'];
    this.formObj = this.formBuilder.group({
      qty: ['', Validators.compose([
        Validators.required,
      ])],
      size: ['', Validators.compose([
        Validators.required,
      ])],
      prompt: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  async ngOnInit() {
    this.formObj.controls['qty'].patchValue(this.qtyList[0]);
    this.formObj.controls['size'].patchValue(this.sizeList[0]);
    this.formObj.controls['qty'].markAsUntouched();
    this.formObj.controls['size'].markAsUntouched();
    this.formObj.updateValueAndValidity();
  }

  async submit() {
    const rawForm = this.formObj.getRawValue();

    this.openAI.createImages(rawForm.prompt, rawForm.qty, rawForm.size).subscribe({
      next: async (data) => {
        this.imageList = data;
      },
      error: async (error) => {
        this.localStorageService.removeItem('askMeTT');
        await this.alertHelper.sweetalert.fire({
          title: 'Error',
          text: error?.message,
          icon: 'error',
        });
      }
    });
  }
}
