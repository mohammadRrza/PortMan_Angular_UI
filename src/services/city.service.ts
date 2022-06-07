import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
  providedIn: 'root'
})

export class CityService {

    apiURL = environment.APIEndpoint +'city/';
    token = localStorage.getItem('access_token');

constructor(private _http: HttpClient,private _router: Router) { }
httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token '+this.token

    })
 };
  login = new LoginCls(this._router);
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); 
      return Promise.reject(error.message || error);
  }

  get_cities(page,itemsPerPage): Promise<any> {
    return this._http
      .get(this.apiURL, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_city_byName(page,itemsPerPage,city_name): Promise<any> {
    return this._http
      .get(this.apiURL+ "?city_name="+city_name, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
  getProvinces(city_name): Promise<any> {
    return this._http
      .get(this.apiURL+ "?parent=all&city_name="+city_name, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
  get_city_by_name(parent_id): Promise<any> {
    return this._http
      .get(this.apiURL+ "?parent="+parent_id, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
  get_city_by_id(parent_id, city_srch): Promise<any> {
    return this._http
      .get(this.apiURL+ "?parent="+parent_id+"&city_name="+city_srch, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
}