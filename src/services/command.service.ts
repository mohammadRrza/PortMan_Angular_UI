import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';



@Injectable({
  providedIn: 'root'
})

export class CommandService {

    apiURL = environment.APIEndpoint +'command/';
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
  load_dslam_commands_by_email(dslam_id,ldap_email, ldap_login,type): Promise<any> {
    return this._http
      .get(this.apiURL + "?dslam_id=" + dslam_id +"&ldap_email="+ldap_email+"&ldap_login="+ldap_login+"&exclude_type=" + type, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  load_dslam_commands_by_username(dslam_id,username, ldap_login,type): Promise<any> {
    return this._http
      .get(this.apiURL + "?dslam_id=" + dslam_id +"&username="+username+"&ldap_login="+ldap_login+"&exclude_type=" + type, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  load_port_commands_by_email(dslam_id, ldap_email, is_ldap_login, type): Promise<any> {
    return this._http
    .get(this.apiURL + "?dslam_id=" + dslam_id +"&ldap_email="+ldap_email+"&ldap_login="+is_ldap_login+"&exclude_type=" + type, this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  load_port_commands_by_username(dslam_id, username, is_ldap_login, type): Promise<any> {
    return this._http
    .get(this.apiURL + "?dslam_id=" + dslam_id +"&username="+username+"&ldap_login="+is_ldap_login+"&exclude_type=" + type, this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  load_all_commands(dslam_id, username, ldap_login): Promise<any> {
    return this._http
      .get(this.apiURL + "?dslam_id=" + dslam_id+'&username='+username+'&ldap_login='+ldap_login, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_all_commands_by_email(dslam_id, ldap_email, ldap_login): Promise<any> {
    return this._http
      .get(this.apiURL + "?dslam_id=" + dslam_id+'&ldap_email='+ldap_email+'&ldap_login='+ldap_login, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_all_commands(): Promise<any> {
    return this._http
      .get(this.apiURL, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  search_commands(command_obj){
    return this._http
      .get(this.apiURL+'?command_name='+command_obj, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

}