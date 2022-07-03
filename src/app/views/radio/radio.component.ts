import { Component, OnInit } from '@angular/core';
import {RadioService} from '../../../services/radio.service'


@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  constructor(private radioSrv:RadioService) { 
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    }; 
  }
  is_ldap_login;
  agent_username: string;
  ldap_email: string;
  radios = [];
  pagination_config;
  radio_backup_errors = [];
  view_backup_error_file: boolean = false;
  view_radio_info_popup: boolean = false;
  radio = {};
  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_all_radios(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  search_radios(search_elem,type){
    if(type == 1){
      
    }
    else if(type == 2){
      this.radioSrv.search_radios(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"search_ip="+search_elem).then(res=>{
        this.radios =  res.results;
        this.pagination_config.totalItems = res.count;
      });
  
    }
    else if(type == 3){
      this.radioSrv.search_radios(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"search_fqdn="+search_elem).then(res=>{
        this.radios =  res.results;
        this.pagination_config.totalItems = res.count;
      });
    }
  }
  
  show_radio_info(radio_id){
    this.view_radio_info_popup = true;
    this.radioSrv.get_radio_info(radio_id).then(res=>{
      this.radio = res
    });
  }

  show_radio_backup_error(){
    this.radioSrv.show_radio_backup_error().then(res=>{
      this.view_backup_error_file = true;
      this.radio_backup_errors = res.response;
    });
  }

  get_all_radios(page,itemsPerPage){
    this.radioSrv.get_all_radios(page,itemsPerPage).then(res=>{
      this.radios = res.results;
      this.pagination_config.totalItems = res.count;

    });
  }
  ngOnInit(): void {
    this.is_ldap_login = localStorage.getItem("ldap_login");
    this.agent_username = localStorage.getItem("username")?localStorage.getItem("username"):'';
    this.ldap_email = localStorage.getItem("ldap_email")?localStorage.getItem("ldap_email").toLowerCase():'';
    this.get_all_radios(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
