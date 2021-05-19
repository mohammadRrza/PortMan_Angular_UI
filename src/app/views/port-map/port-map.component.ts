import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../../services/contact.service'
@Component({
  selector: 'app-port-map',
  templateUrl: './port-map.component.html',
  styleUrls: ['./port-map.component.css']
})
export class PortMapComponent implements OnInit {

  constructor(private conSrv:ContactService) { 
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }
  
  pagination_config;
  orders_ports = [];
  search_str='';
  search_str2='';
  search_str3='';
  search_str4='';
  search_str5='';

  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_orders_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  get_orders_ports(page,itemsPerPage){
    this.conSrv.get_orders_ports(page,itemsPerPage).then(res=>{
    this.orders_ports = res.results;
    this.pagination_config.totalItems = res.count;

    });
  }

  check_port_conflict(fqdn,slot_number,port_number){

  }

  search_orders(search_elem,type){
    if(type == 1){
      this.search_str= '';
      this.search_str = "search_username="+search_elem;

  
    }
    else if(type == 2){
      this.search_str2= '';
      this.search_str2 = "&search_ranjePhoneNumber="+search_elem;

  
    }
    else if(type == 3){
      this.search_str3= '';
      this.search_str3 = "&search_fqdn="+search_elem;
    }

    else if(type == 4){
      this.search_str4= '';
      this.search_str4 = "&search_slot="+search_elem;

    }

    else if(type == 5){
      this.search_str5= '';
      this.search_str5 = "&search_port="+search_elem;

    }
    var search_str = this.search_str+this.search_str2+this.search_str3+this.search_str4+this.search_str5+this.search_str2+this.search_str3+this.search_str4+this.search_str5;
    this.conSrv.search_orders(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, search_str).then(res=>{
      this.orders_ports =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  ngOnInit(): void {
    this.get_orders_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
