import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service'
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    apiURL = environment.APIEndpoint + 'users/';
    token = localStorage.getItem('access_token');
    helper = new JwtHelperService();

    constructor(private _http: HttpClient, private notSrv: NotificationService) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };

    login(userInfo): Promise<any> {
        console.log(userInfo);
        return this._http
            .post(this.apiURL + 'login/', userInfo, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    loggedin() {
      let loggedin = !this.helper.isTokenExpired(this.token);
      console.log('loggedin:' + loggedin);
      localStorage.setItem('loggedin', String(loggedin));
    }

    get_permission(): Promise<any> {
        return this._http
            .get(this.apiURL + 'get_permission/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    get_users_permission(page,itemsPerPage): Promise<any> {
        return this._http
            .get(this.apiURL + 'permission-profile/?page='+page, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: HttpErrorResponse): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
