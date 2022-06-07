import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
    providedIn: 'root'
})

export class RadioCommandService {
    apiURL = environment.APIEndpoint + 'radio-command/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient,private _router: Router) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };
    login = new LoginCls(this._router);
    get_radio_commands(radio_type_id, limit_row): Promise<any> {
        return this._http
            .get(this.apiURL + "?radio_type_id="+radio_type_id+"&limit_row="+limit_row, this.httpOptions)
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