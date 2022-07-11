import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service'
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
    providedIn: 'root'
})

export class PortManCDMSService {
    apiURL = environment.APIEndpoint + 'portman_cdms/';
    apiURL2 = environment.APIEndpoint + 'users/';
    apiURL3 = environment.APIEndpoint + 'user/';
    apiURL4 = environment.APIEndpoint + 'dslamport/';
    apiURL5 = environment.APIEndpoint + 'portman-commands-log/';
    apiURL6 = environment.APIEndpoint + 'portman-commands-log/';

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
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
    get_port_info(username:string): Promise<any> {
        return this._http
            .get(this.apiURL+'get_user_port_info/?username='+username , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }
    
    get_dslam_id_by_fqdn(fqdn:string): Promise<any> {
        return this._http
            .get(this.apiURL+'get_dslam_id_by_fqdn/?fqdn='+fqdn , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }
    get_fqdn_from_zabbix_by_ip(ip:string): Promise<any> {
        return this._http
            .get(this.apiURL+'get_fqdn_from_zabbix_by_ip/?ip='+ip , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
}

get_dslam_id_by_ip(ip:string): Promise<any> {
    return this._http
        .get(this.apiURL+'get_dslam_id_by_ip/?ip='+ip , this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
}

get_fqdn_from_zabbix(fqdn:string): Promise<any> {
    return this._http
        .get(this.apiURL+'get_fqdn_from_zabbix/?fqdn='+fqdn , this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
}

add_bulk_users_to_portman(user_str:string): Promise<any> {
    return this._http
        .post(this.apiURL2, user_str, this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
}

set_permission_for_user(email:string): Promise<any> {
    return this._http
        .get(this.apiURL3+'set_permission_for_user/?email='+email, this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
}

ping_dslam(ping_str): Promise<any> {
    return this._http
        .post(this.apiURL5+'icmp/command/', ping_str, this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
}

port_register(port_config_str): Promise<any> {
    return this._http
        .post(this.apiURL4+'register-port/', port_config_str, this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
    }
get_command_history(username, page, page_size): Promise<any> {
    return this._http
        .get(this.apiURL6+'?page='+page+'&page_size='+page_size+'&username='+username, this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
    }
}