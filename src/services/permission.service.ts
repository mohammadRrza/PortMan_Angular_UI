import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
    providedIn: 'root'
})

export class PermissionService {
    apiURL = environment.APIEndpoint + 'profile/';
    apiURL2 = environment.APIEndpoint + 'permission-profile/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient, private notSrv: NotificationService,private _router: Router) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };
    login = new LoginCls(this._router);
    get_permissions_profiles(page,page_size): Promise<any> {
        return this._http
            .get(this.apiURL + "?page=" + page , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    search_profile(name_obj){
        return this._http
            .get(this.apiURL + "?search_name=" + name_obj , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    delete_permission_profile(permission_profile_id){
        return this._http
            .post(this.apiURL2+'delete_permission_profile/', {'permission_profile_id': permission_profile_id} , this.httpOptions)
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
