import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import {LoginCls} from './../app/dtos/login_cls';


@Injectable({
  providedIn: 'root'
})

export class DslamPortService {

    apiURL = environment.APIEndpoint +'dslam-port/';
    apiURL2 = environment.APIEndpoint +'dslamport/command/';
    apiURL3 = environment.APIEndpoint +'port-command/';
    apiURL4 = environment.APIEndpoint +'dslamport/';


    token = localStorage.getItem('access_token');

constructor(private _http: HttpClient,private _router: Router) { }
httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token '+this.token

    })
};
login = new LoginCls(this._router);
private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
  get_all_dslam_ports(page,page_size): Promise<any> {
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+page_size, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_dslam_ports(page,page_size,dslam_id): Promise<any> {
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+page_size +"&search_dslam_id="+dslam_id, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_dslamPort_info(port_id): Promise<any> {
    return this._http
      .get(this.apiURL + port_id, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_port_command_history(dslam_id,port_id,command_type_id,limit_row): Promise<any> {
    return this._http
      .get(environment.APIEndpoint + "port-command/?dslam="+dslam_id+"&dslamport_id="+port_id+"&command_type_id="+command_type_id+"&limit_row="+limit_row, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }
  run_command(command_obj): Promise<any> {
    return this._http
      .post(this.apiURL4+'dslam_commandsV2/', command_obj, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_last_command(dslam_id,port_id): Promise<any> {
    return this._http
      .get(this.apiURL3+'?dslam='+dslam_id+'&dslamport_id='+port_id+'&limit_row=1&command_type_id=32', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_history_report(port_id): Promise<any> {
    return this._http
      .get(this.apiURL+port_id+'/'+'report/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_dslamport_event(page,page_size,sort_field): Promise<any> {
    return this._http
      .get(this.apiURL4+'events/?page='+page+'&page_size='+page_size+'&sort_field=-'+sort_field+'', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        this.login.check_login(err)
    });
  }

  get_port_count_func():Promise<any>{
    return this._http
    .post(this.apiURL+'get_port_count/', this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(err=>{
      this.handleError;
      this.login.check_login(err)
  });
  }

  register_port(command_obj): Promise<any> {
    return this._http
        .post(this.apiURL+'register-port/', command_obj,this.httpOptions)
        .toPromise()
        .then(res => res)
        .catch(err=>{
          this.handleError;
          this.login.check_login(err)
      });
}

get_snmp_port_status(oprt_params): Promise<any> {
  return this._http
      .post(this.apiURL4+'get_snmp_port_status/', oprt_params,this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
}

}