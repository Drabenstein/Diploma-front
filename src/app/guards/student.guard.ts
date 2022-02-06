import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      tap((auth) => {
        if (auth) {
          return this.authService.user$.subscribe((user) => {
            const roles: String[] = user?.['https://localhost:5001/api/roles'];
            if (roles.includes('student')) {
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
      })
    );
  }
}
