import {LocalStorageService} from '@services/localstorage.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UtilsHelper} from "@helpers/utils";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private utilsHelper: UtilsHelper,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot) {

    const token = this.localStorageService.getItem('askMeTT');

    if (route.routeConfig?.path === '' && token) {
      this.router.navigate(['/chat']);
      return false
    } else {
      if (route.data['auth']) {
        if (!this.utilsHelper.notNull(token)) {
          this.router.navigate(['/token']);
          return false
        }
      }
    }

    return true;
  }
}
