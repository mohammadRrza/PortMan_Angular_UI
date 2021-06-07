import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private userSrv: UserService) {
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
   }

  users = [];
  pagination_config: any;
  permission;
  get_users(page,itemsPerPage){
    this.userSrv.get_users(page,itemsPerPage).then(res=>{
      this.users =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  pageChange_srch(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_users(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }
  ngOnInit(): void {
    this.permission = JSON.parse(localStorage.getItem("permissions"));
    console.log(this.permission);
    this.get_users(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);

  }

}
