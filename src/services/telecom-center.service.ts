import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TelecomCenterService {
    apiURL = environment.APIEndpoint +'telecom-center/';
    token = localStorage.getItem('access_token');

constructor(private _http: HttpClient) { }
httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token '+this.token

    })
};
getAllTelecomCenters(page,page_size): Promise<any> {
    console.log();
    return this._http
        .get(this.apiURL + "?page="+page+"&page_size="+page_size, this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(this.handleError);   
     }

     getTelecomCenterByName(page,page_size,search_name): Promise<any> {
        console.log();
        return this._http
            .get(this.apiURL + "?page="+page+"&page_size="+page_size+"&search_name="+search_name, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);   
         }
         getTelecomCenterByString(search_str): Promise<any> {
            console.log();
            return this._http
                .get(this.apiURL + search_str, this.httpOptions)
                .toPromise()
                .then(res => res)
                .catch(this.handleError);   
             }
getTelecomCenterByCityId(city_id, search_name): Promise<any> {
    console.log(city_id);
    return this._http
    .get(this.apiURL + '?search_city_id='+city_id+'&search_name='+search_name, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleError);   
}


private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
}
}
