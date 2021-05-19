import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ResellerService {
    apiURL = environment.APIEndpoint + 'reseller/';
    token = localStorage.getItem('access_token');

    constructor(private _http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };

    get_all_resellers(page, page_size): Promise<any> {
        return this._http
            .get(this.apiURL + "?page=" + page + "&page_size=" + page_size, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}