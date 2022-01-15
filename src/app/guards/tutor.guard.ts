import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, mergeMap, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TutorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

/*
  canActivate(): boolean {

    this.authService.isAuthenticated$.subscribe((auth) => {
      if (auth) {

        this.authService.user$.subscribe((user) => {
          const roles: String[] = user?.['https://localhost:5001/api/roles'];
          if (roles.includes('tutor')) {
            return true;
          } else {
            this.router.navigate(['403']);
            return false;
          }
        });
      } else {
        this.router.navigate(['401']);
        return false;
      }
    });

  }
  */
}
