import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  //apiURL = environment.APIEndpoint+'api/v1/repository/';
  apiURL = environment.APIEndpoint + 'contact/';
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

  get_orders_ports(page,itemsPerPage): Promise<any> {
    return this._http
      .get(this.apiURL + "portmap/?page="+page+"&page_size="+itemsPerPage, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
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
}