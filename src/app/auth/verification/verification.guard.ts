import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService} from '../auth.service';

@Injectable()
export class VerificationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  userVerified = false;
  private verifyListener: Subscription;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.verifyListener = this.authService.getVerifyListener().subscribe(verified => {
      this.userVerified = verified;
    });
    if (!this.userVerified) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
