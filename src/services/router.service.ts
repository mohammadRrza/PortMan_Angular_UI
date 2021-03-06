import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';

@Injectable({
  providedIn: 'root'
})

export class RouterService {
  apiURL = environment.APIEndpoint + 'router/';
  apiURL2 = environment.APIEndpoint + 'router-command/';
  constructor(private _http: HttpClient,private _router: Router) { }
  token = localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Token '+this.token,
        'Content-Type':'application/json'
    })
};
login = new LoginCls(this._router);
private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

get_all_routers(page,itemsPerPage): Promise<any> {
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  
search_routers(page,itemsPerPage,searchStr): Promise<any> {
  return this._http
    .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage+"&"+searchStr, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(err=>{
      this.handleError;
      this.login.check_login(err)
  });
}


get_backup_files_name(router_id): Promise<any> {
  return this._http
    .post(this.apiURL+'get_router_backup_files_name/', {'router_id':router_id}, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(err=>{
      this.handleError;
      this.login.check_login(err)
  });
}

get_backup_files_name2(router_id): Promise<any> {
  return this._http
    .post(this.apiURL+'get_router_backup_files_name2/', {'router_id':router_id}, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(err=>{
      this.handleError;
      this.login.check_login(err)
  });
}



download_backup_file(backup_file_name: string, router_id): Promise<any> {
  return this._http
    .post(this.apiURL+'download_router_backup_file/', {'backup_file_name':backup_file_name, 'router_id': router_id}, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(err=>{
      this.handleError;
      this.login.check_login(err)
  });
}

show_router_backup_error(): Promise<any> {
  return this._http
    .post(this.apiURL2+'read_router_backup_error_files_name/', {}, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(err=>{
      this.handleError;
      this.login.check_login(err)
  });
}
}