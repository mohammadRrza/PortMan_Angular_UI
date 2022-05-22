import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {LoginCls} from '../../dtos/login_cls';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ResellerService } from '../../../services/reseller.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [DatePipe]
})
export class UserManagementComponent implements OnInit {

  constructor(private userSrv: UserService,
    private resellerSrv : ResellerService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private datePipe: DatePipe,
    fb: FormBuilder
    ) {

    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };

    this.types = [
      {name: 'ADMIN'},
      {name: 'SUPERVISOR'},
      {name: 'SUPPORT'},
      {name: 'RESELLER'},
      {name: 'COREUSER'},
      {name: 'DIRECTRESELLER'},
    ];

    this.add_user_from = this.formBuilder.group({
      date_joined : new FormControl("", Validators.required),
      email : new FormControl("", Validators.required),
      first_name : new FormControl("", Validators.required),
      is_active : new FormControl("", Validators.required),
      last_login : new FormControl("", Validators.required),
      last_name : new FormControl("", Validators.required),
      reseller_info : new FormControl("", Validators.required),
      reseller : new FormControl("", Validators.required),
      tel: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      confirm_password: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.edit_user_from = this.formBuilder.group({
      email : new FormControl("", Validators.required),
      first_name : new FormControl("", Validators.required),
      is_active : new FormControl("", Validators.required),
      last_name : new FormControl("", Validators.required),
      reseller : new FormControl("", Validators.required),
      tel : new FormControl("", Validators.required),
      type : new FormControl("", Validators.required),
      username : new FormControl("", Validators.required),
    });
   }
  progressSpinner: boolean;
  add_user_from: FormGroup;
  edit_user_from: FormGroup;
  users = [];
  pagination_config: any;
  permission;
  displayMaximizable_add: boolean = false;
  displayMaximizable_edit: boolean = false;
  reseller_info: boolean = false;
  user_edit: any = {};
  types = [];
  listResellers = [];
  selectfilter : any;
  checked: boolean = false;
  reseller_keyword = 'name';
  date : Date;
  is_ldap_login;
  agent_username: string;
  ldap_email: string;

  add_user(){
    this.displayMaximizable_add = true;
  }

  apply_add_user(form_user_obj){
    console.log(form_user_obj)
    this.add_user_from.value.type = form_user_obj.value.type.name;
    this.userSrv.create_user(JSON.stringify(form_user_obj.value)).then(res => {
      this.user_edit = res;
      this.get_users(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
    })
  }

  edit_user(user_id){
    this.userSrv.edit_user(user_id).then(res => {
      this.user_edit = res;
      this.displayMaximizable_edit = true;
    });
  }

  apply_edit_user(){
    console.log(typeof(this.edit_user_from.value.reseller))
    console.log(Boolean(this.edit_user_from.value.reseller))
    if (this.edit_user_from.value.reseller) {
      let param_str = '{"username":"'+this.user_edit.username+'","first_name":"'+this.user_edit.first_name+'",\
      "last_name":"'+this.user_edit.last_name+'","email":"'+this.user_edit.email+'",\
      "tel":"'+this.user_edit.tel+'","reseller":"'+this.edit_user_from.value.reseller.id+'",\
      "is_active":"'+this.user_edit.is_active+'","type":"'+this.edit_user_from.value.type.name+'"}'
      this.edit_user_from.value.reseller.id = this.edit_user_from.value.reseller;
      this.userSrv.apply_edit_user(this.user_edit.id, param_str).then(res=>{
        this.edit_user(this.user_edit.id);
        console.log(this.user_edit)
        this.get_users(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
      
      });
    }
    let param_str = '{"username":"'+this.user_edit.username+'","first_name":"'+this.user_edit.first_name+'",\
    "last_name":"'+this.user_edit.last_name+'","email":"'+this.user_edit.email+'",\
    "tel":"'+this.user_edit.tel+'","reseller":"",\
    "is_active":"'+this.user_edit.is_active+'","type":"'+this.user_edit.type+'"}'
    console.log(param_str)
    console.log(this.user_edit.id)
    this.userSrv.apply_edit_user(this.user_edit.id, param_str).then(res=>{
    this.edit_user(this.user_edit.id);
    console.log(this.user_edit)
    this.get_users(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
      });
  }

  get_types(event){
    let type_of_user =  event.value.name;
    console.log(type_of_user);
    this.user_edit.type = type_of_user;
    if (type_of_user == "RESELLER") {
      this.reseller_info = true;
    }
  }

  get_datetime(){
    this.date = new Date();
    let curent_date =this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  get_users(page,itemsPerPage){
    this.progressSpinner = true;
    this.userSrv.get_users(page,itemsPerPage).then(res=>{
      this.users =  res.results;
      this.pagination_config.totalItems = res.count;
      this.progressSpinner = false;
    });
  }

  pageChange_srch(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_users(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  selectEvent(item){
    console.log(item)
  }

  onChangeSearch(event){
    this.resellerSrv.search_reseller(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,event).then(res=>{
      this.listResellers =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  onFocused(event){
      this.get_all_resellers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage)
  }

  get_all_resellers(page, page_size) {
    this.resellerSrv.get_all_resellers(page, page_size).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listResellers = res.results;
    });
  }

  remove_user(user_id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this User?',
      accept: () => {
        this.userSrv.remove_user(user_id).then(res => {
          this.user_edit = res;
          // this.get_all_resellers(this.pagination_config.currentPage,10);
        });
      }
    });
  }

  ngOnInit(): void {
    this.is_ldap_login = localStorage.getItem("ldap_login");
    this.agent_username = localStorage.getItem("username")?localStorage.getItem("username"):'';
    this.ldap_email = localStorage.getItem("ldap_email")?localStorage.getItem("ldap_email").toLowerCase():'';
    if(this.is_ldap_login != 'true'){
      var loginCls =  new LoginCls(this.jwtHelper,this.router);
      loginCls.check_login();
    }
    this.permission = JSON.parse(localStorage.getItem("permissions"));
    this.get_users(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }
}
