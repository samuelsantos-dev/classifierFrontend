import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!window.navigator.onLine) {
            this.createAlert('Connection lost!', 'Connection lost.');
            return throwError(new HttpErrorResponse({ error: 'Connection lost.' }));
        }

        return next.handle(req).pipe(catchError(error => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            switch (errorObj.status) {
                case 403:
                    break;
                case 422:
                    this.handle422(errorObj);
                    break;
                default:
                    this.createAlert(`Erro ${errorObj.status}: ${errorObj.error}`, errorObj.message);
                    break;
            }

            return throwError(errorObj);
        }) as any);
    }


    handle422(errorObj: { errors: { message: any; }[]; }) {
        let errorsMessage = '';
        errorObj.errors.map((fieldMessage: { message: any; }) => errorsMessage += `<div style="margin-bottom: 5px;">- ${fieldMessage.message}</div>`);

        this.toastr.error(errorsMessage, 'err', {
            timeOut: 10000,
            enableHtml: true
        });
    }

    createAlert(title: string, message: string) {
        this.toastr.error(`${title}, ${message}`);
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
