import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
  
export class CoreApi {
    constructor(private http: HttpClient) { }
  
    googleSSO(id, pw) {
        let url = '';
        
        return this.http.post(url, {_id: id, _pw:pw})
        .pipe(map((res) => {

        }));
    }
}
  