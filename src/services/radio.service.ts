import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
    providedIn: 'root'
})

export class RadioService {
    apiURL = environment.APIEndpoint + 'radio/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient,private _router: Router) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };
    login = new LoginCls(this._router);
    get_all_radios(page, page_size): Promise<any> {
        return this._http
            .get(this.apiURL + "?page=" + page + "&page_size=" + page_size, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    search_radios(page, itemsPerPage,searchStr): Promise<any> {
        return this._http
        .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage+"&"+searchStr, this.httpOptions)
        .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    get_radio_info(radio_id): Promise<any> {
        return this._http
        .get(this.apiURL+radio_id+"/", this.httpOptions)
        .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }


    get_backup_files_name(radio_id): Promise<any> {
        return this._http
          .post(this.apiURL+'get_radio_backup_files_name/', {'radio_id': radio_id}, this.httpOptions)
          .toPromise()
          .then(res => res)
          .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
      }

    download_backup_file(backup_file_name: string): Promise<any> {
        return this._http
          .post(this.apiURL+'download_radio_backup_file/', {'backup_file_name':backup_file_name}, this.httpOptions)
          .toPromise()
          .then(res => res)
          .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
      }
      
    show_radio_backup_error(){
        return this._http
        .post(this.apiURL+'read_radio_backup_error_files_name/', {}, this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
            this.handleError;
            this.login.check_login(err)
        });
      }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}