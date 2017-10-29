import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Globalvar } from './globalvars.module';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

 	constructor(public globalvar: Globalvar) {}

 	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const dupReq = req.clone({ headers: req.headers.set('Authorization', 
			'Bearer ' + this.globalvar.api_token
			) });
		return next.handle(dupReq);
 	}
	};
@NgModule({
 	providers: [
 	{ provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
 	]
	})
export class InterceptorModule { }