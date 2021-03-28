import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Webhook, WebhookAdapter, WebhookResponse } from "./model/webhook.model";
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  
  export class WebhookApi {
    constructor(private http: HttpClient, private adapter: WebhookAdapter) { }
  
  
    // 조건조회
    search(param): Observable<WebhookResponse> {
        let url = `${environment.apiBaseUrl}api/v1/webhook/read`;
        return this.http.get<WebhookResponse>(url, {headers: {'Content-Type': 'application/json'}})
            .pipe(map(data =>
                this.adapter.adapt(data)));
    }
  
    // 저장/수정
    save(data: any): Observable<any> {
        let url = `${environment.apiBaseUrl}api/v1/webhook/write`;
        return this.http.post<any>(url, data);
            // .pipe(map((res: Webhook) =>
            //     this.adapter.adapt(res)));
    }
    // 삭제
    delete(webhookId: string): Observable<any> {
        let url = `${environment.apiBaseUrl}api/v1/webhook/delete`;
        return this.http.delete(`${url}/${webhookId}`);
    }
  }
  