import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RouterCommandService {

  //apiURL = environment.APIEndpoint+'api/v1/repository/';
  apiURL = environment.APIEndpoint + 'router-command/';
  constructor(private _http: HttpClient) { }
  //token = localStorage.getItem('access_token');
  token = localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Token '+this.token,
        'Content-Type':'application/json'
    })
};


router_run_command(Router_dto): Promise<any> {
  return this._http
    .post(this.apiURL+'router_run_command/', Router_dto, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
}
private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  get_router_commands(router_type_id, limit_row): Promise<any> {
    console.log(this.token);
    return this._http
      .get(this.apiURL + "?router_type_id="+router_type_id+"&limit_row="+limit_row, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

}