import { LoginService } from 'app/security/login/login.service';
import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { NotificationService } from './shared/messages/notification.service';


import 'rxjs/add/observable/throw'


@Injectable()
export class AplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService, private Injector: Injector) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message
      switch (errorResponse.status) {
        case 401:
          this.Injector.get(LoginService).handleLogin()
          break;
        case 403:
          this.ns.notify(message || 'Não autorizado.')
          break;
        case 404:
          this.ns.notify(message || 'Recurso não encontrado')
          break;
      }
    }
    super.handleError(errorResponse)
  }
}

