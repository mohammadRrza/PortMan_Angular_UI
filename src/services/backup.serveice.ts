import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
}) 

export class BackupService {

    apiURL = environment.APIEndpoint +'router-command/';
    apiURL2 = environment.APIEndpoint +'switch/';

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

  
  send_router_errors_text_file(): Promise<any> {
    return this._http
      .post(this.apiURL+'read_router_backup_error_files_name/',{}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  send_switch_errors_text_file(): Promise<any> {
    return this._http
      .post(this.apiURL2+'read_switch_backup_error_files_name/',{}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
}