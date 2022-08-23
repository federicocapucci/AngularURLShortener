import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const TOKEN = "8d74e454d6dad92e56ea3e942bc469f7f81d233e";

    request = request.clone({setHeaders:{Authorization: 'Bearer ' + TOKEN}})

    return next.handle(request);
  }
}
