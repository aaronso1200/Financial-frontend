import { CanActivate,
          ActivatedRouteSnapshot,
          RouterStateSnapshot,
          Router
      } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private cookieService: CookieService) {
  }
  userAuthenticated :string;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

      this.userAuthenticated = this.authService.getToken();
    if (!this.userAuthenticated) {
      this.authService.logout();
      this.router.navigate(['/login', {unAuth: 'true'}]);
      return false;
    }
    return true;
  }

}
