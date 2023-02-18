import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsHelper} from "@helpers/utils";

@Component({
  selector: 'app-page-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class PageChatComponent implements OnInit {

  public sessionId: number;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private utilsHelper: UtilsHelper,
  ) {
    this.sessionId = null!;
  }

  async ngOnInit() {
    this.sessionId = this.route.snapshot.params['sessionId'] || this.utilsHelper.getRandomId();
  }


  openConversation(sessionId?: any) {
    this.sessionId = sessionId;
    if (sessionId) {
      this.router.navigate([`/chat/${sessionId}`]);
      return;
    }
    this.router.navigate([`/chat}`]);
  }
}
