import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  apiURL = environment.APIEndpoint + 'contact/';
  apiURL2 = environment.APIEndpoint + 'farzanegan_data/';
  constructor(private _http: HttpClient,private _router: Router) { }
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

  get_orders_ports(page,itemsPerPage,telecom_id, port_status_id): Promise<any> {
    return this._http
    .get(this.apiURL + "portmap/?page="+page+"&page_size="+itemsPerPage+'&telecom_id='+telecom_id+'&port_status_id='+port_status_id, this.httpOptions)
    .toPromise()
      .then(res => res)
      .catch(err=>{
        this.handleError;
        if(err.status === 401){
          this._router.navigate(['/login']);
        }
      });
  }

  search_orders(page,itemsPerPage,searchStr): Promise<any> {
    return this._http
      .get(this.apiURL + "portmap/?page="+page+"&page_size="+itemsPerPage+"&"+searchStr, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_provinces_name(province_name): Promise<any> {
    return this._http
      .get(this.apiURL+'get_provinces/?province_name='+province_name, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_cities_name(city_name,province_id): Promise<any> {
    return this._http
      .get(this.apiURL+'get_cities_by_province_id/?province_id='+province_id+'&city_name='+city_name, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_telecoms_name(telecom_name,city_id): Promise<any> {
    return this._http
      .get(this.apiURL+'get_telecoms_by_city_id/?city_id='+city_id+'&telecom_name='+telecom_name, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_port_statuses(): Promise<any> {
    return this._http
      .get(this.apiURL+'get_port_statuses/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }


  search_ports(page,itemsPerPage,telecom_id, port_status_id): Promise<any> {
    return this._http
      .get(this.apiURL + "portmap/?page="+page+"&page_size="+itemsPerPage+'&telecom_id='+telecom_id+'&port_status_id='+port_status_id, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  change_port_status(order): Promise<any> {
    return this._http
      .post(this.apiURL+ "update_status_ports/", order, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_ordr_port_info(username): Promise<any> {
    return this._http
      .get(this.apiURL+ "get_ordr_port_info/?username="+username, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_ddr_info(owner_username, currentPage, itemsPerPage): Promise<any> {
    return this._http
      .get(this.apiURL2+'?page='+currentPage+'&page_size='+itemsPerPage+'&owner_username='+owner_username, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_ddr_info_total(owner_username): Promise<any> {
    return this._http
      .get(this.apiURL+'farzanegan_provider_date?owner_username='+owner_username, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  get_ddr_info_exportExcel(owner_username): Promise<any> {
    return this._http
      .get(this.apiURL+'get_ddr_info_exportExcel/?owner_username='+owner_username, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
}