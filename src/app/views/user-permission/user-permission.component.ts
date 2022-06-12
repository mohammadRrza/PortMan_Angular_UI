import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommandService } from '../../../services/command.service';
import { Permission } from '../../dtos/permission_dto';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})


export class UserPermissionComponent implements OnInit {

  constructor(private usrSrv: UserService,
    private commandSrv: CommandService) { 
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
  listDslams = [];
  add_permission_profile : boolean = false;
  view_user_dslam_permission_profile: boolean = false;
  view_user_command_permission_profile: boolean = false;
  edit_permission_profile_view: boolean = false;
  user_permissions_edit = [];
  commands = [];
  user_id :number;
  permission_profile: number;
  user_permission_profile_id: number;
  command_ids = [];
  exclude_command_ids = [];
  selected_commands: any;
  slot:any;


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

  edit_permissions(permission_id, user_id, permission_profile, user_permission_profile_id){
    this.user_id = user_id;
    this.permission_profile = permission_profile;
    this.user_permission_profile_id = user_permission_profile_id;
    this.edit_permission_profile_view = true;

    this.usrSrv.edit_permissions(permission_id).then(res=>{
      this.user_permissions = res.result;
      this.user_permissions.forEach(element =>{
        this.exclude_command_ids.push(element.object_id);
      });
      console.log(this.exclude_command_ids);

    });
  }

  get_all_commands(){
    this.commandSrv.get_all_commands().then(res=>{
      this.commands =  res;
    });  
  }

  getTemperature(event){

  }

  assign_commands_to_user(event){
    // console.log(event);
    // console.log(this.user_id);
    // console.log(this.permission_profile);
    // console.log(this.user_permission_profile_id);
    this.command_ids = [];
    event.forEach(element =>{
      this.command_ids.push(element.id);
      // console.log(this.command_ids);

    });
    let user_permission_str = '{"user":'+this.user_id+',"action":"allow","is_active":true,"permission_profile":'+this.user_id+',"id":'+this.user_id+',"objects":[{"type":"dslam","id":[]},{"type":"command","id":['+this.command_ids+']}]}';
    console.log(user_permission_str);

  }

  ngOnInit(): void {
    this.get_users_permission(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
