import {Component, OnInit} from '@angular/core';
import {StorageProxy} from '@proxies/storage.proxy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private storageProxy: StorageProxy
  ) {
  }

  ngOnInit() {
    this.storageProxy.init();
  }
}
