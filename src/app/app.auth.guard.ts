import {JwtService} from '@services/jwt.services';
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {UtilsHelper} from "@helpers/utils";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private utilsHelper: UtilsHelper,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot) {

    console.log(route.data)
    console.log(route.routeConfig?.path === '')

    if(route.data['auth']) {
      const token = this.jwtService.get('token');

      if(!this.utilsHelper.notNull(token)) {
        this.router.navigate(['token']);
        return false
      }

      return true;
    }

    return true;
  }
}
