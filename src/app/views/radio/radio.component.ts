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

  radios = [];
  pagination_config;

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
  

  get_all_radios(page,itemsPerPage){
    this.radioSrv.get_all_radios(page,itemsPerPage).then(res=>{
      this.radios = res.results;
      this.pagination_config.totalItems = res.count;

    });
  }
  ngOnInit(): void {
    this.get_all_radios(1,10);
  }

}
