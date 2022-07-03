import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
  providedIn: 'root'
})

export class SwitchService {
  apiURL = environment.APIEndpoint + 'switch/';
  constructor(private _http: HttpClient,
    private _router: Router,
    ){
     }

  token = localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Token '+ this.token,
        'Content-Type':'application/json'
    })
};
login = new LoginCls(this._router);
private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); 
  return Promise.reject(error.message || error);
}

  get_all_switches(page,itemsPerPage): Promise<any> {
    console.log(this.token);
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });

  }


  search_switches(page,itemsPerPage,searchStr): Promise<any> {
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage+"&"+searchStr, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
  get_switch_show_vlan_brief_files_name(switch_id): Promise<any> {
    return this._http
      .post(this.apiURL+'get_switch_show_vlan_brief_files_name/', {'switch_id':switch_id} , this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  switch_run_command(Switch_dto): Promise<any> {
    return this._http
      .post(this.apiURL+'switch_run_command/', Switch_dto, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_backup_files_name(switch_id: number): Promise<any> {
    return this._http
      .post(this.apiURL+'get_backup_files_name/', {'switch_id':switch_id}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
  download_backup_file(backup_file_name: string): Promise<any> {
    return this._http
      .post(this.apiURL+'download_backup_file/', {'backup_file_name':backup_file_name}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_backup_error_file(): Promise<any> {
    return this._http
      .post(this.apiURL+'get_backup_error_file/',{}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_switch_backup_files_name(switch_id): Promise<any> {
    return this._http
      .post(this.apiURL+'get_switch_backup_files_name/',{'switch_id':switch_id}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_backup_error_text(backup_file_name: string): Promise<any> {
    return this._http
      .post(this.apiURL+'get_backup_error_text/',{'backup_file_name': backup_file_name}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  show_switch_backup_error(): Promise<any> {
    return this._http
      .post(this.apiURL+'read_switch_backup_error_files_name/',{}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
  
  download_view_vlan_brief_file(vlan_brief_file_name: string): Promise<any> {
    return this._http
      .post(this.apiURL+'download_view_vlan_brief_file/', {'vlan_brief_file_name':vlan_brief_file_name}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
}