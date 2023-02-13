import {Component, OnInit} from '@angular/core';
import {ConversationProxy} from "@proxies/conversation.proxy";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public conversations: any;

  constructor(
    private conversationProxies: ConversationProxy
  ) {
  }

  ngOnInit() {
    this.loadConversation();
  }

  async loadConversation() {
    const conversations = await this.conversationProxies.getHistory();
    console.log(conversations)
    this.conversations = conversations;
    // this.conversations = conversations || [];
  }

  parseLastMessage(value: any) {
    return value[value.length -1];
  }
}
