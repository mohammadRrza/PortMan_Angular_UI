import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class ResellerService {
    apiURL = environment.APIEndpoint + 'reseller/';
    token = localStorage.getItem('access_token');
    constructor(private _http: HttpClient,private _router: Router) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };

    create_reseller(form_reseller_obj):Promise<any>{
        return this._http
            .post(this.apiURL,form_reseller_obj , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    edit_reseller(reseller_id){
        return this._http
            .get(this.apiURL + reseller_id+'/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    apply_edit_reseller(reseller_id, paramstr):Promise<any>{
        let param_obj = JSON.parse(paramstr);
        return this._http
            .put(this.apiURL + reseller_id+'/', param_obj, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    remove_reseller(reseller_id):Promise<any>{
        return this._http
            .delete(this.apiURL + reseller_id +'/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    search_reseller(page,itemsPerPage,name): Promise<any> {
        return this._http
          .get(this.apiURL + "?name="+name+"&page="+page+"&page_size="+itemsPerPage, this.httpOptions)
          .toPromise()
          .then(res => res)
          .catch(this.handleError);
      }
    get_all_resellers(page, page_size , name = null): Promise<any> {
        return this._http
            .get(this.apiURL + "?page=" + page + "&page_size=" + page_size + "?name=" + name , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(err=>{
                this.handleError;
                if(err.status === 401){
                  this._router.navigate(['/login']);
                }
              });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}