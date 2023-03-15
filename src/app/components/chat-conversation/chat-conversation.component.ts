import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConversationModel, ENUM_FROM} from "@app/models";
import {UtilsHelper} from "@helpers/utils";
import {ConversationProxy} from "@proxies/conversation.proxy";
import moment from "@helpers/moment";
import logger from "@app/app.logger";

const logContent = logger.logContent('app:chat-conversation');

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnChanges {

  @Input() sessionId: number;
  public formObj: FormGroup;
  public conversationFrom = ENUM_FROM;
  public conversations: ConversationModel[];
  public loading: boolean;
  public today: any;
  @ViewChild('scrollMe') private chatContainer: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private conversationProxies: ConversationProxy,
    private utilsHelper: UtilsHelper,
  ) {
    this.loading = false;
    this.conversations = [];
    this.today = moment().format();
    this.formObj = this.formBuilder.group({
      message: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.utilsHelper.notNull(changes['sessionId']?.currentValue)) {
      this.sessionId = changes['sessionId'].currentValue;
      await this.loadConversation();
    }
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (_) {
      // ignore
    }
  }

  async loadConversation() {
    this.conversations = await this.conversationProxies.getConversation(this.sessionId);
    await this.utilsHelper.wait(100);
    this.scrollToBottom();
  }

  async submit() {
    if (!this.sessionId) {
      this.sessionId = this.utilsHelper.getRandomId();
    }

    const rawForm = this.formObj.getRawValue();
    await this.conversationProxies.saveConversation(this.sessionId, {
      from: ENUM_FROM.ME,
      message: rawForm.message,
      timestamp: moment().valueOf()
    });
    this.formObj.reset();
    this.loading = true;
    await this.loadConversation();

    const messages = this.conversationProxies.parseChatPayload(this.conversations, rawForm.message);
    this.conversationProxies.createChatCompletions(messages).subscribe({
      next: async (message) => {
        await this.conversationProxies.saveConversation(this.sessionId, {
          from: ENUM_FROM.BOT,
          message: message,
          timestamp: moment().valueOf()
        });
        await this.loadConversation();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        logger.error(
          logContent.add({
            info: 'error askQuestion',
            error,
          })
        );
      }
    });
  }
}
