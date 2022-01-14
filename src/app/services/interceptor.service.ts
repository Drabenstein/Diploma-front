import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.match('\\/api\\/roles$') ||
      req.url.match('\\/api\\/chats\\/\\d+\\/history$') ||
      req.url.match('\\/api\\/chats\\/userOnly$') ||
      req.url.match('\\/api\\/applications$')
    ) {
      return this.auth.getAccessTokenSilently().pipe(
        mergeMap((token) => {
          const tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(tokenReq);
        }),
        catchError((err) => throwError(() => err))
      );
    } else {
      return next.handle(req);
    }
  }
}
