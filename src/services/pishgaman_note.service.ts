import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service'

@Injectable({
    providedIn: 'root'
})

export class PishgamanNoteService {
    apiURL = environment.APIEndpoint + 'pishgaman-note/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient, private notSrv: NotificationService) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token
        })
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    get_pishgaman_notes(currentPage,itemsPerPage): Promise<any> {
        return this._http
            .get(this.apiURL , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    save_note(note_str): Promise<any> {
        return this._http
            .post(this.apiURL+'save-note/', note_str, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }
}