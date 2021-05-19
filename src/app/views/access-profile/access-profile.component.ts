import { Component, OnInit } from '@angular/core';
import { PermissionService} from '../../../services/permission.service';

@Component({
  selector: 'app-access-profile',
  templateUrl: './access-profile.component.html',
  styleUrls: ['./access-profile.component.css']
})
export class AccessProfileComponent implements OnInit {

  constructor(private prmSrv:PermissionService) { 
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }
  pagination_config;
  permissions_profiles;
  get_permissions_profiles(page, page_size){
    this.prmSrv.get_permissions_profiles(page, page_size).then(res=>{
      this.permissions_profiles= res.results
      this.pagination_config.totalItems = res.count;

    });
  }

  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_permissions_profiles(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);    
  }
  ngOnInit(): void {
    this.get_permissions_profiles(1,10);
  }

}
