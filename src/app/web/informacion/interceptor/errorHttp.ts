import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private modal: NzModalService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error';

        switch (true) {
          case error.error?.error && typeof error.error.error === 'object':
            errorMessage = '';
            Object.entries(error.error.error).forEach(([clave, valor]) => {
              const aux = valor;

              if (
                Array.isArray(aux) &&
                aux[0].includes('has already been taken')
              ) {
                valor = aux[0]
                  .replace(
                    'has already been taken',
                    ' ya se se encuentra registrado'
                  )
                  .replace('The', 'El campo ');
              }
              errorMessage += `* ${clave}: ${valor}</br>\n`;
            });
            break;

          case error.error?.codigo === 400:
            errorMessage = error.error.mensaje;
            break;

          case typeof error?.message == 'string':
            errorMessage = error.message;
            break;

          default:
            errorMessage = error.error;
            break;
        }

        this.modal.warning({
          nzTitle: 'Ocurrio algo inesperado',
          nzContent: errorMessage,
        });
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
