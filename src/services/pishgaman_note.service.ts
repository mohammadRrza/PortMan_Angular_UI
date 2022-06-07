import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
    providedIn: 'root'
})

export class PishgamanNoteService {
    apiURL = environment.APIEndpoint + 'pishgaman-note/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient, private notSrv: NotificationService,private _router: Router) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token
        })
    };
    login = new LoginCls(this._router);
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    get_pishgaman_notes(currentPage,itemsPerPage): Promise<any> {
        return this._http
            .get(this.apiURL+'?page='+currentPage+'&page_size='+itemsPerPage , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    save_note(note_obj): Promise<any> {
        return this._http
            .post(this.apiURL+'save-note/', note_obj, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

    get_note_by_id(note_id): Promise<any> {
        return this._http
            .get(this.apiURL+'?note_id='+note_id, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }


    apply_edit_note(note_id): Promise<any> {
        return this._http
            .post(this.apiURL+'save-note/', note_id, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                this.login.check_login(err)
            });
    }

}