import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BandwidthService {

    apiURL = environment.APIEndpoint;
    token = localStorage.getItem('access_token');

constructor(private _http: HttpClient) { }
httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token '+this.token

    })
 };

 private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  get_interface_traffic_input(): Promise<any> {
    return this._http
      .get(this.apiURL+'dslam/get_interface_traffic_input/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_live_traffic_input(): Promise<any> {
    return this._http
      .get(this.apiURL+'dslam/get_interface_traffic_input/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_zabbix_history(zabbix_history): Promise<any> {
    return this._http
      .post(this.apiURL+'dslam/zabbix_get_history/',zabbix_history, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_fifty_five_precntage(): Promise<any> {
    return this._http
      .get(this.apiURL+'dslam/get_fifty_five_precntage/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

}