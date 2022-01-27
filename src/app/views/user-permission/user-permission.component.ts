import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Permission } from '../../dtos/permission_dto';

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
    this.dslam_permissions = [
  ];
  }

  
  dslam_permissions:Permission[];
  command_permissions:Permission[];
  selected_dslamPermissions: Permission;
  selected_commandPermissions: Permission;
  user_permissions : Permission[];
  pagination_config;
  users_permissions = [];
  add_permission_profile : boolean = false;
  view_user_dslam_permission_profile: boolean = false;
  view_user_command_permission_profile: boolean = false;

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

  get_user_permission_profile(permission_profile_id, model_type){
    this.usrSrv.get_user_permission_profile(permission_profile_id).then(res => {
      if(res.result){     
      if(model_type == 1){
        this.dslam_permissions = res.result.filter((element) => element.model_type === 'dslam');
        this.selected_dslamPermissions = res.result.filter((element) => element.model_type === 'dslam');
        this.user_permissions = res.result.filter((element) => element.model_type === 'dslam');
        this.view_user_dslam_permission_profile = true;
      }
      else{
        this.command_permissions = res.result.filter((element) => element.model_type === 'command');
        this.selected_commandPermissions = res.result.filter((element) => element.model_type === 'command');
        this.user_permissions = res.result.filter((element) => element.model_type === 'command');
        this.view_user_command_permission_profile = true;

      }
    }
    });
  }

  show_add_Permission(){
    this.add_permission_profile = true;
  }
  onChange(event){
    console.log(event);
    this.user_permissions = event.value;
  }

  ngOnInit(): void {
    this.get_users_permission(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
