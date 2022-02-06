import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      tap((auth) => {
        if (auth) {
          return true;
        } else {
          this.router.navigate(['401']);
          return false;
        }
      })
    );
  }
}
