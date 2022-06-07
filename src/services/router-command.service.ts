import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class RouterCommandService {
  apiURL = environment.APIEndpoint + 'router-command/';
  apiURL2 = environment.APIEndpoint + 'router/';
  constructor(private _http: HttpClient,private _router: Router) { }
  token = localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Token '+this.token,
        'Content-Type':'application/json'
    })
};


router_run_command(Router_dto): Promise<any> {
  return this._http
    .post(this.apiURL2+'router_run_command/', Router_dto, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
}
private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  get_router_commands(router_type_id, limit_row): Promise<any> {
    return this._http
      .get(this.apiURL + "?router_type_id="+router_type_id+"&limit_row="+limit_row, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        if(err.status === 401){
          this._router.navigate(['/login']);
        }
      });
  }



}