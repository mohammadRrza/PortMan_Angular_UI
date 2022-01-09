import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service'

@Injectable({
    providedIn: 'root'
})

export class PortManCDMSService {
    apiURL = environment.APIEndpoint + 'portman_cdms/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient, private notSrv: NotificationService) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token
        })
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
    get_port_info(username:string): Promise<any> {
        return this._http
            .get(this.apiURL+'get_user_port_info/?username='+username , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }
    
    get_dslam_id_by_fqdn(fqdn:string): Promise<any> {
        return this._http
            .get(this.apiURL+'get_dslam_id_by_fqdn/?fqdn='+fqdn , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }
    get_fqdn_from_zabbix_by_ip(ip:string): Promise<any> {
        return this._http
            .get(this.apiURL+'get_fqdn_from_zabbix_by_ip/?ip='+ip , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
}

get_dslam_id_by_ip(ip:string): Promise<any> {
    return this._http
        .get(this.apiURL+'get_dslam_id_by_ip/?ip='+ip , this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(this.handleError);
}

get_fqdn_from_zabbix(fqdn:string): Promise<any> {
    return this._http
        .get(this.apiURL+'get_fqdn_from_zabbix/?fqdn='+fqdn , this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(this.handleError);
}

}