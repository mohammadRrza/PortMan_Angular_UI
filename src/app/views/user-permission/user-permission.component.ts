import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

  constructor(private usrSrv: UserService) { 
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }
  pagination_config;
  users_permissions = [];
  add_permission_profile : boolean = false;
  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_users_permission(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);    
  }
  get_users_permission(page,itemsPerPage) {
    this.usrSrv.get_users_permission(page,itemsPerPage).then(res => {
      this.users_permissions = res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  show_add_Permission(){
    this.add_permission_profile = true;
  }
  ngOnInit(): void {
    this.get_users_permission(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
