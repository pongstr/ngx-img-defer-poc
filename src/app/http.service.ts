import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = '72be4ca4e61856113818cb9c9660f13c55cb1315fdb9f49372604a8a443303db';
    const headers: HttpHeaders = new HttpHeaders();
    request = request.clone({
      headers: headers
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Client-ID ${token}`)
        .set('Accept-Version', 'v1')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        return throwError(error);
      }));
  }
}

export function interceptorProvider() {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }
}
