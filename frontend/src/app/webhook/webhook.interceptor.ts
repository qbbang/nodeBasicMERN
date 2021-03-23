import {Injectable, NgZone} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private zone: NgZone
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addXClient(request);
    request = this.addToken(request, 'token-string');
    return next.handle(request).pipe(catchError( error => {
            return throwError(error);
        }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
  private addXClient(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'X-Client-id': `89f3b898d4d455eedbe2e3d706fa5efa0d84db18d86a409b26edd83cd8095109`,
        'X-Client-secret': `f1b85e29687df6c4806f2f92b5d040e56f5b5154fb1ab64473ef33781309b6df`
      }
    });
  }
}
