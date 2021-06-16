import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SwitchService {

  //apiURL = environment.APIEndpoint+'api/v1/repository/';
  apiURL = environment.APIEndpoint + 'switch/';
  constructor(private _http: HttpClient) { }
  //token = localStorage.getItem('access_token');
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

  get_all_switches(page,itemsPerPage): Promise<any> {
    console.log(this.token);
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  search_switches(page,itemsPerPage,searchStr): Promise<any> {
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage+"&"+searchStr, this.httpOptions)
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
}