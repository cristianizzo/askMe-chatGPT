import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConversationModel, ENUM_FROM} from "@app/models";
import {ActivatedRoute} from "@angular/router";
import {UtilsHelper} from "@helpers/utils";
import {ConversationProxy} from "@proxies/conversation.proxy";
import moment from "@helpers/moment";

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit {

  public formObj: FormGroup;
  public sessionId: number;
  public conversationFrom = ENUM_FROM;
  public conversations: ConversationModel[];

  constructor(
    private formBuilder: FormBuilder,
    private conversationProxies: ConversationProxy,
    private utilsHelper: UtilsHelper,
    public route: ActivatedRoute,
  ) {
    this.sessionId = null!;
    this.conversations = [];
    this.formObj = this.formBuilder.group({
      message: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  async ngOnInit() {
    this.sessionId = this.route.snapshot.params['sessionId'] || this.utilsHelper.getRandomId();
    await this.loadConversation();
  }

  async loadConversation() {
    this.conversations = await this.conversationProxies.getConversation(this.sessionId);
  }

  async submit() {
    const rawForm = this.formObj.getRawValue();
    await this.conversationProxies.saveInStorage(this.sessionId, {from: ENUM_FROM.ME, message: rawForm.message, timestamp: moment().toISOString()});
    await this.loadConversation();

    this.conversationProxies.askQuestion(rawForm.message).subscribe({
      next: async (message) => {
        await this.conversationProxies.saveInStorage(this.sessionId, {from: ENUM_FROM.BOT, message: message, timestamp: moment().toISOString()});
        await this.loadConversation();
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
