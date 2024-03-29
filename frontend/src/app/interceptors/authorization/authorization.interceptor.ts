import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.getAuthToken()) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.getAuthToken()}`)
      })
      return next.handle(newRequest);
    }
    
    return next.handle(request);
  }
}
