import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NotificationService } from './notification.service'
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
    providedIn: 'root'
})

export class UserService {
    apiURL = environment.APIEndpoint + 'users/';
    apiURL2 = environment.APIEndpoint + 'users-permission-profile/';

    token = localStorage.getItem('access_token');
    helper = new JwtHelperService();

    constructor(private _http: HttpClient, private notSrv: NotificationService) {
        this.token = localStorage.getItem('access_token');

    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.token

        })
    };

    login(userInfo): Promise<any> {
        return this._http
            .post(this.apiURL + 'login/', userInfo, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    ldap_login(userInfo): Promise<any> {
        return this._http
            .post(this.apiURL + 'ldap_login/', userInfo, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    loggedin() {
      let loggedin = !this.helper.isTokenExpired(this.token);
      console.log('loggedin:' + loggedin);
      localStorage.setItem('loggedin', String(loggedin));
    }

    get_permission(): Promise<any> {
        this.token = localStorage.getItem('access_token');
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.token
    
            })
        }; 
        return this._http
            .get(this.apiURL + 'get_permission/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    get_users_permission(page,itemsPerPage): Promise<any> {
        return this._http
            .get(this.apiURL2 + '?page='+page, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    create_user(form_user_obj){
        return this._http
            .post(this.apiURL, form_user_obj, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    edit_user(user_id){
        return this._http
            .get(this.apiURL + user_id+'/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    edit_permissions(permission_id): Promise<any> {
        return this._http
            .get(this.apiURL+'permission-profile/'+permission_id+'/objects/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    add_permissions(permission_obj): Promise<any> {
        return this._http
            .post(this.apiURL2,permission_obj, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }
    
    get_user_permission_info(username,page): Promise<any> {
        return this._http
            .get(this.apiURL2 + '?username='+username+ '&page='+page, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }
    
    apply_edit_user(user_id, paramstr):Promise<any>{
        let param_obj = JSON.parse(paramstr);
        return this._http
            .put(this.apiURL + user_id+'/', param_obj, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    remove_user(user_id):Promise<any>{
        return this._http
            .delete(this.apiURL +'permission-profile/'+ user_id , this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    get_users(page,itemsPerPage): Promise<any> {
        return this._http
            .get(this.apiURL + '?page='+page+'&page_size='+itemsPerPage, this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    send_reset_password_link(email): Promise<any> {
        return this._http
            .post(this.apiURL+'SendResetPasswordLink/', {'email':email},this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }
    
    get_user_permission_profile(permission_profile_id){
        return this._http
            .get(this.apiURL2+permission_profile_id+'/objects/', this.httpOptions)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    search_users(user_obj){
        return this._http
          .get(this.apiURL +"?username="+user_obj, this.httpOptions)
          .toPromise()
          .then(res => res)
          .catch(this.handleError);
    }


    private handleError(error: HttpErrorResponse): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
