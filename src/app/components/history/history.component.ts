import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConversationProxy} from "@proxies/conversation.proxy";
import {UtilsHelper} from "@helpers/utils";
import {ActivationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Output() onSelectedSession = new EventEmitter<any>();
  public conversations: { id: string; message: string; }[];
  public searchQuery: string;
  public selectedSessionId: string;

  constructor(
    private conversationProxies: ConversationProxy,
    private utilsHelper: UtilsHelper,
    private router: Router,
  ) {
    router.events.subscribe(data => {
      if (data instanceof ActivationEnd) {
        this.selectedSessionId = data.snapshot.params['sessionId'];
      }
    });
  }

  ngOnInit() {
    this.loadConversation();
  }

  async loadConversation() {
    const conversations = await this.conversationProxies.getHistory();

    if (!this.utilsHelper.objectHasValue(conversations)) {
      this.conversations = [];
    }

    this.conversations = Object.keys(conversations).reduce((acc: any, key: any) => {

      acc.push({
        id: key,
        from: conversations[key][0].from,
        message: conversations[key][0].message,
        timestamp: conversations[key][0].timestamp
      });

      return acc;
    }, []).sort((a: any, b: any) => b.id - a.id);
  }

  selectConversation(conversationId?: any) {
    this.onSelectedSession.emit(conversationId);
  }

  async deleteConversation(conversationId?: any) {
    await this.conversationProxies.deleteConversation(conversationId);
    this.loadConversation();
  }
}
