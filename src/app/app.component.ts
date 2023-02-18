import {Component, OnInit} from '@angular/core';
import {StorageProxy} from '@proxies/storage.proxy';
import {environment} from '@env/environment';
import logger from '@app/app.logger';

const logContent = logger.logContent('app:component');

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

    logger.info(
      logContent.add({
        info: `app running on ${environment.host} - env: ${environment.env}`,
      })
    );
  }
}
