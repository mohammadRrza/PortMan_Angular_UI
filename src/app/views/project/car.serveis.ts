import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CarService {
    constructor(private _http: HttpClient) { }

    getCars(): Promise<any> {
        return this._http
            .get('assets/data.json')
            .toPromise()
            .then(res => res)
            .catch(err=>{
                console.log(err);
            });
        }
}