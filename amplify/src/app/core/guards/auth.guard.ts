import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// export const AuthGuard: CanActivateFn = (route, state) => {
//   const role = authService.getRole();
//   return role === 'admin';
//   return true;
// };

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const loggedIn = this.authService.isLoggedIn();

    if (loggedIn) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
