import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css']
})
export class RoutersComponent implements OnInit {

  constructor(private routSrv: RouterService) {   
     this.pagination_config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  }; 
}

  routers = [];
  pagination_config;

  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_all_routers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  get_all_routers(page,itemsPerPage){
    this.routSrv.get_all_routers(page,itemsPerPage).then(res=>{
      this.routers =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  download_router_backup(router_ip){
console.log(router_ip);
  }

  search_routers(search_elem,type){
    if(type == 1){
    }
    else if(type == 2){
      this.routSrv.search_routers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"search_ip="+search_elem).then(res=>{
        this.routers =  res.results;
        this.pagination_config.totalItems = res.count;
      });

    }
    else if(type == 3){
      this.routSrv.search_routers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"search_fqdn="+search_elem).then(res=>{
        this.routers =  res.results;
        this.pagination_config.totalItems = res.count;
      });
    }
  }

  ngOnInit(): void {
    this.get_all_routers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }
}
