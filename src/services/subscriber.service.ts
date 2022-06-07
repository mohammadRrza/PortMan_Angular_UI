import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';

@Injectable({
    providedIn: 'root'
})

export class SubscriberService {
    apiURL = environment.APIEndpoint + 'customer-port/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient,private _router: Router) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };
    login = new LoginCls(this._router);
    create_subscriber(form_subscriber_obj):Promise<any>{
        return this._http
            .post(this.apiURL,form_subscriber_obj , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    get_city_by_name(parent_id): Promise<any> {
        return this._http
          .get(this.apiURL+ "?parent="+parent_id, this.httpOptions)
          .toPromise()
          .then(res => res)
          .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
    }

    apply_edit_subscriber(subs_id, paramstr):Promise<any>{
        console.log(paramstr)
        let param_obj = JSON.parse(paramstr);
        console.log(param_obj)
        return this._http
            .put(this.apiURL + subs_id+'/', param_obj, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    edit_subscriber(sub_id):Promise<any>{
        return this._http
            .get(this.apiURL + sub_id+'/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    remove_subscriber(sub_id):Promise<any>{
        return this._http
            .delete(this.apiURL + sub_id +'/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    get_all_subscriber(page,itemsPerPage): Promise<any> {
        return this._http
            .get(this.apiURL + "?page=" + page + "&page_size=" + itemsPerPage , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}