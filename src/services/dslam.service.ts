import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DslamService {

  //apiURL = environment.APIEndpoint+'api/v1/repository/';
  apiURL = environment.APIEndpoint + 'dslam/';
  apiURL2 = environment.APIEndpoint + 'dslamport/dslam_commandsV2/';
  apiURL3 = environment.APIEndpoint + 'dslam-port/';
  constructor(private _http: HttpClient) { }
  //token = localStorage.getItem('access_token');
  token = localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Token '+this.token,
        'Content-Type':'application/json'
    })
};
private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
  //services
  get_all_dslams(page,itemsPerPage): Promise<any> {
    return this._http
      .get(this.apiURL + "?page="+page+"&page_size="+itemsPerPage, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  add_dslam(dslamInfo): Promise<any> {
    return this._http
      .post(this.apiURL ,dslamInfo ,this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  getDslamInfo(dslamId): Promise<any> {
    return this._http
      .get(this.apiURL + dslamId, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  getDslamReport(dslamId): Promise<any> {
    return this._http
      .get(this.apiURL + dslamId + '/dslamreport/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  getDslamBoard(dslamId): Promise<any> {
    return this._http
      .get(this.apiURL + dslamId + '/board/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  get_dslam_current_icmp_result(dslamId): Promise<any> {
    return this._http
      .get(this.apiURL + dslamId + '/dslam_current_icmp_result/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  run_icmp_command(icmp_info): Promise<any> {
    return this._http
      .post(this.apiURL + 'icmp/command/', icmp_info, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  search_dslams(page,itemsPerPage,search_str): Promise<any> {
    return this._http
    .get(this.apiURL + '?page='+page+'&page_size='+itemsPerPage+search_str, this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  edit_dslam(dslam_id):Promise<any>{
    return this._http
    .get(this.apiURL + dslam_id+'/', this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  apply_add_dslam(paramstr):Promise<any>{
    let param_obj = JSON.parse(paramstr);
    return this._http
    .post(this.apiURL+'/', param_obj, this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  
  apply_edit_dslam(dslam_id, paramstr):Promise<any>{
    let param_obj = JSON.parse(paramstr);
    return this._http
    .put(this.apiURL + dslam_id+'/', param_obj, this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  show_dslam_info(dslam_id):Promise<any>{
    return this._http
    .get(this.apiURL + dslam_id+'/', this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  remove_dslam(dslam_id):Promise<any>{
    return this._http
    .get(this.apiURL + dslam_id+'/', this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  run_command(command_obj): Promise<any> {
    return this._http
      .post(this.apiURL2, command_obj, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_last_command(dslam_id): Promise<any> {
    return this._http
      .get(this.apiURL+'command/result/?dslam='+dslam_id+'&limit_row=5&command_type=', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  
  get_dslam_event(page,page_size,sort_field): Promise<any> {
    return this._http
      .get(this.apiURL+'events/?page='+page+'&page_size='+page_size+'&sort_field=-'+sort_field+'', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  get_dslam_icmp_snapshotCount(date,count): Promise<any> {
    return this._http
      .get(this.apiURL+'get_dslams_packet_loss_count/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  load_dslam_ports(dslam_id, slot_count, port_count):Promise<any> {
    return this._http
      .get(this.apiURL+'load_dslam_ports?dslam_id='+dslam_id+'&slot_count='+slot_count+'&port_count='+port_count, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  search_port(page,page_size,dslam_id, slot_number, port_number):Promise<any> {
    return this._http
      .get(this.apiURL3+'?page='+page+'&page_size='+page_size+'&search_dslam_id='+dslam_id+'&search_slot_number='+slot_number+'&search_port_number='+port_number, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  register_ngn_number(ngn_command_str):Promise<any> {
    console.log(ngn_command_str);
    return this._http
      .post(this.apiURL+'ngn_register/', ngn_command_str, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  }
