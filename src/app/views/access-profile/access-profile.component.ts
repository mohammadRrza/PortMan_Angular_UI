import { Component, OnInit } from '@angular/core';
import { PermissionService} from '../../../services/permission.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-access-profile',
  templateUrl: './access-profile.component.html',
  styleUrls: ['./access-profile.component.css']
})
export class AccessProfileComponent implements OnInit {

  constructor(private prmSrv:PermissionService,
              private confirmationsrv: ConfirmationService,
                        ) { 
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }
  pagination_config;
  permissions_profiles;
  add_permission_dialog;
  edit_profile_dialog;
  delete_profile_dialog;

  get_permissions_profiles(page, page_size){
    this.prmSrv.get_permissions_profiles(page, page_size).then(res=>{
      this.permissions_profiles= res.results
      this.pagination_config.totalItems = res.count;

    });
  }
  show_permission_profile(){
    this.add_permission_dialog = true;
  }

  edit_permission_profile(profile_id){
    this.edit_profile_dialog = true;
  }



  remove_Profile(profile_id){
    this.confirmationsrv.confirm({
      message: 'Are you sure that you want to delete this Profile?',
      accept: () => {
        this.prmSrv.delete_permission_profile(profile_id).then(res=>{
          this.get_permissions_profiles(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
        });
      }
  });

  }
  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_permissions_profiles(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);    
  }
  ngOnInit(): void {
    this.get_permissions_profiles(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
