import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-ddr-page-info',
  templateUrl: './ddr-page-info.component.html',
  styleUrls: ['./ddr-page-info.component.css']
})
export class DdrPageInfoComponent implements OnInit {

  constructor(private contSrv:ContactService) {
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
   }
   pagination_config;
   farzanegan_data = [];
   farzanegan_data_total;
   get_ddr_info(username, currentPage, itemsPerPage){
    this.contSrv.get_ddr_info(username, currentPage, itemsPerPage).then(res=>{
      this.farzanegan_data = res.results;
      this.pagination_config.totalItems = res.count;
    });
    
   }

   get_ddr_info_total(username){
    this.contSrv.get_ddr_info_total(username).then(res=>{
      this.farzanegan_data_total = res.result;
    });
    
   }

   paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_ddr_info('',this.pagination_config.currentPage, this.pagination_config.itemsPerPage);    
  }

  ngOnInit(): void {
    this.get_ddr_info_total('Iran-sepanta');
    this.get_ddr_info('', this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
