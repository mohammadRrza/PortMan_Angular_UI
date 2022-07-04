import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DslamService } from '../../../services/dslam.service';
import { CommandService } from '../../../services/command.service';
import { PermissionService } from '../../../services/permission.service';
import { Permission } from '../../dtos/permission_dto';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})


export class UserPermissionComponent implements OnInit {

  constructor(private usrSrv: UserService,
    private dslamSrv : DslamService,
    private commandSrv: CommandService,
    private permissionService : PermissionService,
    private confirmationService: CommandService,
    fb: FormBuilder
    ) { 
      this.is_active = [
        {bool: true},
        {bool: false},
      ];
      this.action = [
        {name : 'allow'},
        {name : 'deny'},
      ];
      this.add_form = fb.group({
        action : new FormControl("", Validators.required),
        objects : new FormControl("", Validators.required),
        is_active : new FormControl("", Validators.required),
        permission_profile : new FormControl("", Validators.required),
        user : new FormControl("", Validators.required),
      });
      this.pagination_config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
      };
      this.dslam_permissions = [
    ];
  }

  users = [];
  is_active = [];
  action = [];
  user_keyword = 'username';
  permission_keyword = 'name'
  add_form:FormGroup;
  dslam_keyword = 'search_name';
  command_keyword = 'text';
  dslam_permissions:Permission[];
  command_permissions:Permission[];
  selected_dslamPermissions: Permission;
  selected_commandPermissions: Permission;
  user_permissions : Permission[];
  pagination_config;
  users_permissions = [];
  listDslams = [];
  ListPermissions = [];
  displayMaximizable_add : boolean = false;
  view_user_dslam_permission_profile: boolean = false;
  view_user_command_permission_profile: boolean = false;
  edit_permission_profile_view: boolean = false;
  user_permissions_edit = [];
  user_permission_add = [];
  commands = [];
  dslams = [];
  user_id :number;
  permission_profile: number;
  user_permission_profile_id: number;
  command_ids = [];
  exclude_command_ids = [];
  exclude_dslam_ids = [];
  selected_commands: any;
  slot:any;
  username: string;
  selectfilter : any;
  usersearchs = [];
  dslamsearchs = [];
  commandsearchs = [];
  permissionsearchs = [];
  dslam_ids = [];
  command_id = [];
  dslam_dict = {};
  command_dict = {};
  


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

  selectEvent(item){
  }

  onChangeSearch_users(event){
    this.usrSrv.search_users(event).then(res=>{
      this.usersearchs =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

onFocused_users(event){
  this.get_users(this.pagination_config.currentPage, this.pagination_config.itemsPerPage)
}

onChangeSearch_dslam(event){
  this.dslamSrv.get_dslam_names_search(event).then(res=>{
    this.dslamsearchs =  res.result;
    this.pagination_config.totalItems = res.count;

  });
}

onFocused_dslam(event){
  this.get_dslams_name()
}

onChangeSearch_commands(event){
  this.commandSrv.search_commands(event).then(res=>{
    this.commandsearchs =  res;
  });
}

onFocused_commands(event){
this.get_all_commands()
}

onChangeSearch_profile(event){
  this.permissionService.search_profile(event).then(res=>{
    this.permissionsearchs =  res.results;
  });
}

onFocused_profile(event){
this.permissionService.get_permissions_profiles(this.pagination_config.currentPage, this.pagination_config.itemsPerPage)
}

// get_types(event){
//   let type_of_user =  event.value.name;
//   console.log(type_of_user);
//   this.user_permissions_edit.type = type_of_user;
  
// }

show_add_Permission(){
  this.displayMaximizable_add = true;
}

  apply_add_Permission(form_permission_obj){
    console.log(form_permission_obj.value)
    form_permission_obj.value.permission_profile = form_permission_obj.value.permission_profile.id;
    form_permission_obj.value.user = form_permission_obj.value.user.id;
    form_permission_obj.value.action = form_permission_obj.value.action.name;
    form_permission_obj.value.is_active = form_permission_obj.value.is_active.toString();
    form_permission_obj.value.objects = [this.command_dict,this.dslam_dict];
    console.log(form_permission_obj.value);
    console.log(JSON.stringify(form_permission_obj.value));

    this.usrSrv.add_permissions(JSON.stringify(form_permission_obj.value)).then(res => {
      this.user_permission_add = res;
      this.get_users_permission(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
    })
  }

  // remove_Permission(permission_id){
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to delete this Vlan?',
  //     accept: () => {
  //       this.usrSrv.remove_vlan(vlan_id).then(res => {
  //         this.vlan_edit = res;
  //         this.get_all_vlan(this.pagination_config.currentPage,10);
  //       });
  //     }
  // });
  // }

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

  onChange(event){
    console.log(event);
    this.user_permissions = event.value;
  }
  search_by_name(){
    this.usrSrv.get_user_permission_info(this.username,this.pagination_config.currentPage).then(res=>{
      this.users_permissions = res.results;
      this.pagination_config.totalItems = res.count;
    });
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

  get_users(page,itemsPerPage){
    this.usrSrv.get_users(page,itemsPerPage).then(res=>{
      this.users =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  get_dslams_name(){
    this.dslamSrv.get_dslam_names(10).then(res=>{
      this.dslams =  res.result;
    });
  }

  assign_dslams_to_user(event){
    let obj = event.value
    this.dslam_ids = [];
    obj.forEach(element =>{
      this.dslam_ids.push(element.id);
    });
    this.dslam_dict['id'] = this.dslam_ids
    this.dslam_dict['type'] = 'dslam'
    console.log(this.dslam_dict)
  }
  
  assign_commands_to_user(event){
    let obj = event.value
    this.command_ids = [];
    obj.forEach(element =>{
      console.log(element)
      this.command_ids.push(element.id);
    });
    this.command_dict['id'] = this.command_ids
    this.command_dict['type'] = 'command'
    console.log(this.command_dict)
  }

  ngOnInit(): void {
    this.get_users_permission(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
