import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
    providedIn: 'root'
})

export class PartakService {
    apiURL = environment.APIEndpoint + 'partak/';
    apiURL2 = environment.APIEndpoint + 'dslamport/';
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
    get_partak_provinces(): Promise<any> {
        return this._http
            .get(this.apiURL+"get_partak_provinces/", this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    get_partak_cities_by_province_id(province_id): Promise<any> {
        return this._http
            .get(this.apiURL+"get_partak_cities_by_province_id/?province_id="+province_id, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    get_partak_telecoms_by_city_id(city_id): Promise<any> {
        return this._http
            .get(this.apiURL+"get_partak_telecoms_by_city_id/?city_id="+city_id, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    get_partak_dslam_list_by_telecom_id(telecom_id): Promise<any> {
        return this._http
            .get(this.apiURL+"get_partak_dslam_list_by_telecom_id/?mdf_id="+telecom_id, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    update_partak_fqdn(mdf_id, slat, fqdn): Promise<any> {
        return this._http
            .get(this.apiURL+"update_partak_fqdn/?mdf_id="+mdf_id+'&slat='+slat+'&fqdn='+fqdn, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    search_fqdns(fqdn): Promise<any> {
        return this._http
            .get(this.apiURL2+"search_fqdns?fqdn="+fqdn, this.httpOptions)
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
