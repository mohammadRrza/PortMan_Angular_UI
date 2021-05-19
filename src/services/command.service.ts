import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommandService {

    apiURL = environment.APIEndpoint +'command/';
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

  //services
  load_dslam_commands(dslam_id,type): Promise<any> {
    return this._http
      .get(this.apiURL + "?dslam_id=" + dslam_id + "&exclude_type=" + type, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  load_port_commands(dslam_id,type): Promise<any> {
    return this._http
      .get(this.apiURL + "?dslam_id=" + dslam_id + "&type=" + type, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
}