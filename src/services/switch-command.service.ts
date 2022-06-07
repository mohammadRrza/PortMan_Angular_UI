import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class SwitchCommandService {
  apiURL = environment.APIEndpoint + 'switch-command/';
  constructor(private _http: HttpClient,private _router: Router) { }
  token = localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Token '+this.token,
        'Content-Type':'application/json'
    })
};

private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  get_switch_commands(switch_type_id, limit_row): Promise<any> {
    console.log(switch_type_id +" - "+ limit_row);
    return this._http
      .get(this.apiURL + "?switch_type_id="+switch_type_id+"&limit_row="+limit_row, this.httpOptions)
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