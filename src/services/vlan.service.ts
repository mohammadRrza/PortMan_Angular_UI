import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service';
import { ErrorHandlerService } from './error-handler.service';
import { StatusHandelerService } from './status-handeler.service'; 
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import {LoginCls} from './../app/dtos/login_cls';

@Injectable({
    providedIn: 'root'
})

export class VlanService {
    apiURL = environment.APIEndpoint + 'vlan/';

    token = localStorage.getItem('access_token');
    helper = new JwtHelperService();

    constructor(private _http: HttpClient,
        private notifySrv : NotificationService,
        private _router: Router,
        private errorHandler: ErrorHandlerService,) {
        this.token = localStorage.getItem('access_token');
    }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };
    statusHandler = new StatusHandelerService(this.errorHandler,this.notifySrv)
    login = new LoginCls(this._router);
    private handleError(error: HttpErrorResponse): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    search_vlans(page,itemsPerPage,searchStr): Promise<any> {
        return this._http
          .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage+"&"+searchStr, this.httpOptions)
          .toPromise()
          .then(res => res)
          .catch(err=>{
            this.handleError;
            this.login.check_login(err);
            this.statusHandler.show_errors(err);
        });
      }

    remove_vlan(vlan_id):Promise<any>{
        return this._http
            .delete(this.apiURL + vlan_id +'/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err);
                this.statusHandler.show_errors(err);
            });
    }

    create_vlan(form_vlan_obj):Promise<any>{
        return this._http
            .post(this.apiURL,form_vlan_obj , this.httpOptions)
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

    AssignValnToReseller(reseller_info,vlan_id){
        return this._http
            .post(this.apiURL + '/' + vlan_id, reseller_info , this.httpOptions)
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

    get_all_vlan(page,itemsPerPage): Promise<any> {
        return this._http
            .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err);
                this.statusHandler.show_errors(err);
            });
    }
}
