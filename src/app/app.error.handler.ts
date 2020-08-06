import { LoginService } from 'app/security/login/login.service';
import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { NotificationService } from './shared/messages/notification.service';


import 'rxjs/add/observable/throw'


@Injectable()
export class AplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService,
    private Injector: Injector,
    private zone: NgZone) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.Injector.get(LoginService).handleLogin()
            break;
          case 403:
            this.ns.notify(message || 'Não autorizado.')
            break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique no console para mais detalhes')
            break;
        }
      })
    }
    super.handleError(errorResponse)
  }
}

