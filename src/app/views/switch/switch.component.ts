import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../../services/switch.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {


  constructor(private switchSrv: SwitchService) {   
    this.pagination_config = {
   itemsPerPage: 10,
   currentPage: 1,
   totalItems: 0
 }; 
}

 switches = [];
 pagination_config;
 switch_backup_errors = [];
 view_backup_error_file:boolean = false;
 paginate(event) {
   this.pagination_config.currentPage = event.page + 1;
   this.pagination_config.itemsPerPage = event.rows;
   this.get_all_switches(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
 }

 search_switches(search_elem,type){
  if(type == 1){
    
  }
  else if(type == 2){
    this.switchSrv.search_switches(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"search_ip="+search_elem).then(res=>{
      this.switches =  res.results;
      this.pagination_config.totalItems = res.count;
    });

  }
  else if(type == 3){
    this.switchSrv.search_switches(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"search_fqdn="+search_elem).then(res=>{
      this.switches =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }
}



download_switch_backup(switch_ip){
  console.log(switch_ip);
}
 get_all_switches(page,itemsPerPage){
   this.switchSrv.get_all_switches(page,itemsPerPage).then(res=>{
     this.switches =  res.results;
     this.pagination_config.totalItems = res.count;
   });
 }

 show_switch_backup_error(){
  this.view_backup_error_file = true;
  this.switchSrv.show_switch_backup_error().then(res=>{
    this.switch_backup_errors = res.response;
  });
}

 ngOnInit(): void {
   this.get_all_switches(1,10);
 }
}
