import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable()
export class DesencriptadoInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.urls.apiAutenticacion)) {
      return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
          if (
            event instanceof HttpResponse &&
            event.status >= 200 &&
            event.status < 300
          ) {
            const key = CryptoJS.enc.Utf8.parse(environment.encriptacion.llave);
            const iv = CryptoJS.enc.Utf8.parse(environment.encriptacion.iv);

            if (event.body.encriptado) {
              const resultado = CryptoJS.AES.decrypt(
                event.body.encriptado,
                key,
                {
                  iv: iv,
                }
              ).toString(CryptoJS.enc.Utf8);

              return event.clone({
                body: JSON.parse(resultado),
              });
            } else {
              return event.clone({
                body: event.body,
              });
            }
          }
          return event;
        })
      );
    }

    return next.handle(req);
  }
}
