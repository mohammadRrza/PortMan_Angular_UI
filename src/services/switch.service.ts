import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SwitchService {

  //apiURL = environment.APIEndpoint+'api/v1/repository/';
  apiURL = environment.APIEndpoint + 'switch/';
  constructor(private _http: HttpClient, private _router: Router) { }
  //token = localStorage.getItem('access_token');
  token = localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Token '+ this.token,
        'Content-Type':'application/json'
    })
};

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
        if(err.status === 401){
          this._router.navigate(['/login']);
        }
      });
  }


  search_switches(page,itemsPerPage,searchStr): Promise<any> {
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage+"&"+searchStr, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  get_switch_show_vlan_brief_files_name(switch_id): Promise<any> {
    return this._http
      .post(this.apiURL+'get_switch_show_vlan_brief_files_name/', {'switch_id':switch_id} , this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  switch_run_command(Switch_dto): Promise<any> {
    return this._http
      .post(this.apiURL+'switch_run_command/', Switch_dto, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_backup_files_name(switch_id: number): Promise<any> {
    return this._http
      .post(this.apiURL+'get_backup_files_name/', {'switch_id':switch_id}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  download_backup_file(backup_file_name: string): Promise<any> {
    return this._http
      .post(this.apiURL+'download_backup_file/', {'backup_file_name':backup_file_name}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_backup_error_file(): Promise<any> {
    return this._http
      .post(this.apiURL+'get_backup_error_file/',{}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_switch_backup_files_name(switch_id): Promise<any> {
    return this._http
      .post(this.apiURL+'get_switch_backup_files_name/',{'switch_id':switch_id}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_backup_error_text(backup_file_name: string): Promise<any> {
    return this._http
      .post(this.apiURL+'get_backup_error_text/',{'backup_file_name': backup_file_name}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  show_switch_backup_error(): Promise<any> {
    return this._http
      .post(this.apiURL+'read_switch_backup_error_files_name/',{}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  
  download_view_vlan_brief_file(vlan_brief_file_name: string): Promise<any> {
    return this._http
      .post(this.apiURL+'download_view_vlan_brief_file/', {'vlan_brief_file_name':vlan_brief_file_name}, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
}