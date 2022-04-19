import { Component, OnInit } from '@angular/core';
import { DslamService } from '../../../services/dslam.service';
import { PrimeNGConfig } from 'primeng/api';
import { CityService } from '../../../services/city.service';
import { TelecomCenterService } from '../../../services/telecom-center.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { UserService } from '../../../services/user.service';
import { porv_city, ci_city, telecoms } from '../../dtos/city_dto';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import {LoginCls} from '../../dtos/login_cls';

@Component({
  selector: 'app-dslam',
  templateUrl: './dslam.component.html',
  styleUrls: ['./dslam.component.css']
})
export class DslamComponent implements OnInit {

  form: FormGroup;
  public navItems = navItems;



  constructor(private router: Router,
    private dslamSrv: DslamService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private citySrv: CityService,
    private usrSrv: UserService,
    private telecomSrv:TelecomCenterService,
    private formBuilder: FormBuilder,
    private jwtHelper: JwtHelperService
  ) {
    this.add_dslam_from = this.formBuilder.group({
      dslam_name : new FormControl("", Validators.required),
      dslam_type : new FormControl("", Validators.required),
      get_snmp_community : new FormControl("", Validators.required),
      set_snmp_community : new FormControl("", Validators.required),
      snmp_port : new FormControl("", Validators.required),
      snmp_timeout : new FormControl("", Validators.required),
      telnet_username : new FormControl("", Validators.required),
      telnet_password : new FormControl("", Validators.required),
      ip : new FormControl("", Validators.required),
      province : new FormControl("", Validators.required),
      city : new FormControl("", Validators.required),
      telecom : new FormControl("", Validators.required),
      connection_type : new FormControl("", Validators.required),
      fqdn : new FormControl("", Validators.required),
      dslam_long : new FormControl("", Validators.required),
      dslam_lat : new FormControl("", Validators.required),
      enabled : new FormControl("", Validators.required),
    });
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }
  search_str = '';
  add_dslam_from;
  dslam_info = '';
  pagination_config: any;
  listDslams = [];
  Provinces = [];
  dslam_edit: any = {};
  listProvince: porv_city[] = [];
  name: porv_city;
  c_name: ci_city
  listCites: porv_city[] = [];
  listTelecom: telecoms[] = [];
  displayMaximizable: boolean = false;
  displayMaximizable2: boolean = false;
  displayMaximizable3: boolean = false;
  dslam_show_info: any = [];
  permission: any = [];
  progressSpinner: boolean = false;
  user_permission;
  dslam_add = {};
  submitted = false;
  prov_id;
  is_ldap_login;
  agent_username: string;
  ldap_email: string;
  
  get dslam_name() {
    return this.add_dslam_from.get('dslam_name');
  }

  pageChange_srch(page) {
    console.log(page);
    this.pagination_config.currentPage = page;
    this.get_all_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  get f() { return this.add_dslam_from.controls; }


  edit_dslam(dslam_id) {
    this.dslamSrv.edit_dslam(dslam_id).then(res => {
      this.dslam_edit = res;
    });
    this.displayMaximizable = true;
  }

  show_add_dslam() {
    this.displayMaximizable2 = true;
  }

  show_dslam_info(dslam_id) {
    this.dslamSrv.show_dslam_info(dslam_id).then(res => {
      this.dslam_show_info = res;
    });
    this.displayMaximizable3 = true;
  }



  apply_add_dslam(param) {
    this.submitted = true;
    console.log(this.add_dslam_from.value)
    if (this.add_dslam_from.invalid) {
      return;
    }
    let paramstr = '{"name":"adasasd","telecom_center":90053,"dslam_type":2,"ip":"192.18.1.1","active":true,"status":"new","conn_type":"","get_snmp_community":"asdasdasd","set_snmp_community":"asd","telnet_username":"sdfsdf","telnet_password":"asdasd","snmp_port":"1515","snmp_timeout":"161","fqdn":"adsafasdadasd"}';
return
    this.dslamSrv.apply_add_dslam(paramstr).then(res=>{
      this.get_all_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
    });
  }
  paginate(event) {
    if (this.dslam_info == '') {
      this.pagination_config.currentPage = event.page + 1;
      this.pagination_config.itemsPerPage = event.rows;
      this.get_all_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
    }
    else {
      this.pagination_config.currentPage = event.page + 1;
      this.pagination_config.itemsPerPage = event.rows;
      this.search_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.search_str)
    }

  }

  get_dslam_info(dslam_info, txt_id) {
    console.log(dslam_info);
    this.dslam_info = dslam_info;
    this.pagination_config.currentPage = 1;
    switch (txt_id) {
      case 1: {
        this.search_str = '&search_status=&search_active=&search_dslam=' + dslam_info;
        this.search_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.search_str);
        break;

      }
      case 2: {
        //statements; 
        this.search_str = '&search_status=&search_active=&search_ip=' + dslam_info;
        this.search_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.search_str);
        break;

      }
      case 3: {
        //statements; 
        this.search_str = '&search_status=&search_active=&search_ip=' + dslam_info;
        this.search_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.search_str);
        break;

      }
      case 4: {
        //statements; 
        this.search_str = '&search_ip=' + dslam_info;
        this.search_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.search_str);
        break;

      }
    }

  }

  onReset() {
    this.submitted = false;
    this.add_dslam_from.reset();
}

  remove_dslam(dslam_id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this Dslam?',
        accept: () => {
          this.dslamSrv.remove_dslam(dslam_id).then(res => {
            this.dslam_edit = res;
          });
        
        }
    });
}

get_all_dslams_by_username(page, itemsPerPage, username, ldap_login) {
    this.progressSpinner = true;
    this.dslamSrv.get_all_dslams_by_username(page, itemsPerPage, username, ldap_login).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listDslams = res.results;
      this.progressSpinner = false;
    });
  }

  get_all_dslams_by_email(page, itemsPerPage, email, ldap_login) {
    this.progressSpinner = true;
    this.dslamSrv.get_all_dslams_by_email(page, itemsPerPage, email, ldap_login).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listDslams = res.results;
      this.progressSpinner = false;
    });
  }

  search_dslams(page, itemsPerPage, search_dslams) {
    if(this.is_ldap_login == 'false'){
      this.dslamSrv.search_dslams_by_username(page, itemsPerPage, search_dslams, this.agent_username, this.is_ldap_login).then(srch_res => {
        this.pagination_config.totalItems = srch_res.count;
        this.listDslams = srch_res.results;
      });
    }
    else{
      this.dslamSrv.search_dslams(page, itemsPerPage, search_dslams).then(srch_res => {
        this.pagination_config.totalItems = srch_res.count;
        this.listDslams = srch_res.results;
      });
    }

  }

  get_province_by_name(event) {
    this.citySrv.get_province_by_name(event.query).then(prov_res => {
      this.listProvince = prov_res.results;
    });
  }

  get_city_by_name(parent_id) {
    this.prov_id = parent_id
    console.log("get_city_by_name"+"  "+parent_id)
    this.citySrv.get_city_by_name(parent_id).then(city_res => {
      this.listCites = city_res.results;
    });
  }


  get_city_by_id(event) {
    this.citySrv.get_city_by_id(this.prov_id, event.query).then(city_res => {
      this.listCites = city_res.results;
    });
  }

  getTelecomCenterByCityId(city_id){
    console.log(city_id.query);
    this.telecomSrv.getTelecomCenterByCityId(city_id).then(telecom_res => {
      this.listTelecom = telecom_res.results;
    });
  }

  apply_edit(){
    let param_str = '{"name":"'+this.dslam_edit.name+'","telecom_center":'+this.dslam_edit.telecom_center_info.id+',\
    "dslam_type":'+this.dslam_edit.dslam_type_info.id+',"ip":"'+this.dslam_edit.ip+'","active":'+this.dslam_edit.active+',\
    "status":"'+this.dslam_edit.status+'","conn_type":"'+this.dslam_edit.conn_type+'","get_snmp_community":"'+this.dslam_edit.get_snmp_community+'",\
    "set_snmp_community":"'+this.dslam_edit.set_snmp_community+'","telnet_username":"'+this.dslam_edit.telnet_username+'",\
    "telnet_password":"'+this.dslam_edit.telnet_password+'","snmp_port":'+this.dslam_edit.snmp_port+',\
    "snmp_timeout":'+this.dslam_edit.snmp_timeout+',"fqdn":"'+this.dslam_edit.fqdn+'"}';
    this.dslamSrv.apply_edit_dslam(this.dslam_edit.id, param_str).then(res=>{
      this.edit_dslam(this.dslam_edit.id);
      this.get_all_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
    });
  }
  
  get_permission(){
    this.usrSrv.get_permission().then(perm_res => {
      this.permission = perm_res;
      localStorage.setItem("permissions", JSON.stringify(this.permission));
    });
  }


  get_all_dslams(page, itemsPerPage) {
    if(this.is_ldap_login == 'false'){

      this.get_permission();
      this.get_all_dslams_by_username(page, itemsPerPage,this.agent_username, this.is_ldap_login);
      this.primengConfig.ripple = true;
    }
    else{
      this.get_permission();
      this.get_all_dslams_by_email(page, itemsPerPage,this.ldap_email, this.is_ldap_login);
      this.primengConfig.ripple = true;
    }
  }

  

  ngOnInit(): void {
    // let loggedIn = localStorage.getItem('loggedin');
    // if(!Boolean(loggedIn) || this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'))){
    //   this.router.navigate(['/login']);
    //   return;
    // }else {
    //   console.log("token not expired"); 
    // }
    this.is_ldap_login = localStorage.getItem("ldap_login");
    this.agent_username = localStorage.getItem("username")?localStorage.getItem("username"):'';
    this.ldap_email = localStorage.getItem("ldap_email")?localStorage.getItem("ldap_email").toLowerCase():'';

    if(this.is_ldap_login != 'true'){
          var loginCls =  new LoginCls(this.jwtHelper,this.router);
          loginCls.check_login();
    }
    this.get_all_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
}
}
