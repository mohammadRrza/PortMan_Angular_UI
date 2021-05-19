import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service'

@Injectable({
    providedIn: 'root'
})

export class PermissionService {
    apiURL = environment.APIEndpoint + 'profile/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient, private notSrv: NotificationService) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };

    get_permissions_profiles(page,page_size): Promise<any> {
        return this._http
            .get(this.apiURL + "?page=" + page , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
