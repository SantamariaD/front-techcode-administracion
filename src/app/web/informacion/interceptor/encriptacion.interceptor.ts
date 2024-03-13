import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable()
export class EncryptionInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let encriptar;

    if (
      !request.url.includes(environment.urls.apiAutenticacion) &&
      (request.method === 'POST' || request.method === 'PUT')
    ) {
      const key = CryptoJS.enc.Utf8.parse(environment.encriptacion.llave);
      const iv = CryptoJS.enc.Utf8.parse(environment.encriptacion.iv);
      const jsonString = JSON.stringify(request.body);

      if (request.body instanceof FormData) {
        return next.handle(request);
      } else {
        encriptar = CryptoJS.AES.encrypt(jsonString, key, {
          iv: iv,
        }).toString();

        const requestEncriptado = { encriptado: encriptar };
        const modifiedRequest = request.clone({ body: requestEncriptado });

        return next.handle(modifiedRequest);
      }
    }

    return next.handle(request);
  }
}
