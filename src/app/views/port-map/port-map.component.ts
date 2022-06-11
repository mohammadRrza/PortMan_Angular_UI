import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../../services/contact.service';
import {PortStatus,PortOrder,Bukht} from '../../dtos/city_dto';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-port-map',
  templateUrl: './port-map.component.html',
  styleUrls: ['./port-map.component.css']
})
export class PortMapComponent implements OnInit {

  constructor(private conSrv:ContactService,
    private notifySrv : NotificationService,
    private errorHandler: ErrorHandlerService
    ) { 
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
    
  }
  provinceObj = [];
  cityObj = [];
  telecomObj = [];
  port_statusObj = [];
  port_statusObj_ch = [];
  port_status:PortStatus;
  port_status_ch:PortStatus;
  port_order:PortOrder;
  province_id :number;
  city_id:number;
  port_status_id_ch;
  telecom_id="";
  port_status_id = "";
  pagination_config;
  orders_ports = [];
  search_str='';
  search_str2='';
  search_str3='';
  search_str4='';
  search_str5='';
  port_info :any = {};
  bukht:Bukht = new Bukht();
  View_port_status:boolean = false;
  port_status_ch_res = {};
  new_telco_row:number;
  new_telco_column:number;
  new_telco_connection:number;

  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_orders_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,this.telecom_id, this.port_status_id);
  }

  get_orders_ports(page,itemsPerPage, telecom_id, port_status_id){
    this.conSrv.get_orders_ports(page,itemsPerPage, telecom_id, port_status_id).then(res=>{
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

  View_change_port_status(order_port){
    this.bukht.telco_row = order_port.telco_row;
    this.bukht.telco_column = order_port.telco_column;
    this.bukht.telco_connection = order_port.telco_connection;
    this.bukht.port_status_desc = order_port.port_status_info.description;
    this.bukht.port_status_id = order_port.port_status_info.id;
    this.bukht.telecom_id = order_port.telecomCenter_info.id;

    this.conSrv.get_ordr_port_info(order_port.username).then(res=>{
      this.port_info = res;
    });
   this.View_port_status = true;
  }


  get_provinces_name(event){
    this.conSrv.get_provinces_name(event.query).then(res=>{
      this.provinceObj = res.result;
    });

  }

  get_province_id(province){
    this.province_id = province.id;
  }

  get_cities_name(event){
    this.conSrv.get_cities_name(event.query, this.province_id).then(res=>{
      this.cityObj = res.result;
    });
  }

  get_city_id(city){
    this.city_id = city.id;
  }

  get_telecom_name(event){
    this.conSrv.get_telecoms_name(event.query, this.city_id).then(res=>{
      this.telecomObj = res.result;
    });
  }

  get_telecom_id(telecom){
    this.telecom_id = telecom.id;
    this.search_ports(this.telecom_id, "");
  }
  
  get_port_statuses(){
    this.conSrv.get_port_statuses().then(res=>{
      this.port_statusObj = res.result;
      this.port_statusObj_ch = res.result;
    });
  }

  get_port_status_id(event){
    this.port_status_id = event.id;
    this.search_ports(this.telecom_id, this.port_status_id);
  }

  get_port_status_id_for_ch_st(port_status_ch,event){
    this.port_status_id_ch = event.id;
  }
  show_ports_operations(){
    
  }

  search_ports(telecom_id, port_status_id){
    this.conSrv.search_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,telecom_id, port_status_id).then(res=>{
      this.orders_ports = res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  change_port_status(username){
    this.port_order = new PortOrder;
    this.port_order.username = username;
    this.port_order.new_port_status_id = this.port_status_id_ch?this.port_status_id_ch:1;
    this.port_order.new_telco_row = this.new_telco_row;
    this.port_order.new_telco_column = this.new_telco_column;
    this.port_order.new_telco_connection = this.new_telco_connection;
    this.port_order.old_telco_row = this.bukht.telco_row;
    this.port_order.old_telco_column = this.bukht.telco_column;
    this.port_order.old_telco_connection = this.bukht.telco_connection;
    this.port_order.old_port_status_id = this.bukht.telco_connection;
    this.port_order.old_port_status_id=this.bukht.port_status_id;
    this.port_order.telecom_id = this.bukht.telecom_id;
    this.conSrv.change_port_status(this.port_order).then(res=>{
      this.port_status_ch_res = res;
      this.conSrv.search_orders(1,100, "search_username="+username).then(res=>{
        this.orders_ports =  res.results;
        this.pagination_config.totalItems = res.count;
        this.notifySrv.showSuccess('Change port status was succsessfully','Changing');
      });
    },
    (error) => {
     this.show_errors(error);
     this.notifySrv.showError(this.errorHandler.errorMessage,'Error');
   });

  }


  show_errors(error){
    this.errorHandler.handleError(error);
    if(this.errorHandler.errorMessage.includes('401')){
      this.notifySrv.showError('Unauthorized','Error')
    }
    else if(this.errorHandler.errorMessage.includes('Unknown Error')){
      this.notifySrv.showError('connect to server has been failed','Error')
    }
    else{
      this.notifySrv.showError(this.errorHandler.errorMessage,'Error')
    }
  }

  ngOnInit(): void {
    this.get_orders_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,this.telecom_id, this.port_status_id);
    this.get_port_statuses();

  }

}
