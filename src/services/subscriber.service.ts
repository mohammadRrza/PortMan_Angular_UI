import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';
import { StatusHandelerService } from './status-handeler.service'; 
import { ErrorHandlerService } from './error-handler.service';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})

export class SubscriberService {
    apiURL = environment.APIEndpoint + 'customer-port/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient,
        private _router: Router,
        private errorHandler: ErrorHandlerService,
        private notifySrv : NotificationService,
        ) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };
    statusHandler = new StatusHandelerService(this.errorHandler,this.notifySrv)
    login = new LoginCls(this._router);
    create_subscriber(form_subscriber_obj):Promise<any>{
        return this._http
            .post(this.apiURL,form_subscriber_obj , this.httpOptions)
            .toPromise()
            .then(res => {
                res;
                this.statusHandler.show_succsess(res);
            })
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
                this.statusHandler.show_errors(err);
            });
    }

    get_city_by_name(parent_id): Promise<any> {
        return this._http
          .get(this.apiURL+ "?parent="+parent_id, this.httpOptions)
          .toPromise()
          .then(res => res)
          .catch(err=>{
            this.handleError;
            this.login.check_login(err);
            this.statusHandler.show_errors(err);
        });
    }

    apply_edit_subscriber(subs_id, paramstr):Promise<any>{
        console.log(paramstr)
        let param_obj = JSON.parse(paramstr);
        console.log(param_obj)
        return this._http
            .put(this.apiURL + subs_id+'/', param_obj, this.httpOptions)
            .toPromise()
            .then(res => {
                res;
                this.statusHandler.show_succsess(res);
            })
            .catch(err=>{
                this.handleError;
                this.login.check_login(err);
                this.statusHandler.show_errors(err);
            });
    }

    edit_subscriber(sub_id):Promise<any>{
        return this._http
            .get(this.apiURL + sub_id+'/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err);
                this.statusHandler.show_errors(err);
            });
    }

    remove_subscriber(sub_id):Promise<any>{
        return this._http
            .delete(this.apiURL + sub_id +'/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err);
                this.statusHandler.show_errors(err);
            });
    }

    get_all_subscriber(page,itemsPerPage): Promise<any> {
        return this._http
            .get(this.apiURL + "?page=" + page + "&page_size=" + itemsPerPage , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err);
                this.statusHandler.show_errors(err);
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}