import { Component, OnInit } from '@angular/core';
import { DslamService } from '../../../services/dslam.service';
import { PrimeNGConfig } from 'primeng/api';
import { CityService } from '../../../services/city.service';
import { TelecomCenterService } from '../../../services/telecom-center.service';

import { UserService } from '../../../services/user.service';
import { porv_city, ci_city, telecoms } from '../../dtos/city_dto';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dslam',
  templateUrl: './dslam.component.html',
  styleUrls: ['./dslam.component.css']
})
export class DslamComponent implements OnInit {

  form: FormGroup;
  public navItems = navItems;

  f_dslam_Name = new FormControl("", Validators.required);
  f_dslam_type = new FormControl("", Validators.required);
  f_get_snmp_community = new FormControl("", Validators.required);
  f_set_snmp_community = new FormControl("", Validators.required);
  f_snmp_port = new FormControl("", Validators.required);
  f_snmp_timeout = new FormControl("", Validators.required);
  f_telnet_username = new FormControl("", Validators.required);
  f_telnet_password = new FormControl("", Validators.required);
  f_ip = new FormControl("", Validators.required);
  f_province = new FormControl("", Validators.required);
  f_city = new FormControl("", Validators.required);
  f_telecom = new FormControl("", Validators.required);
  f_connection_type = new FormControl("", Validators.required);
  f_fqdn = new FormControl("", Validators.required);
  f_dslam_long = new FormControl("", Validators.required);
  f_dslam_lat = new FormControl("", Validators.required);

  constructor(private router: Router,
    private dslamSrv: DslamService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private citySrv: CityService,
    private usrSrv: UserService,
    private telecomSrv:TelecomCenterService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      "dslam_Name": this.f_dslam_Name,
      "dslam_type":this.f_dslam_type,
      "get_snmp_community":this.f_get_snmp_community,
      "set_snmp_community":this.f_set_snmp_community,
      "snmp_port":this.f_snmp_port,
      "snmp_timeout":this.f_snmp_timeout,
      "telnet_username":this.f_telnet_username,
      "telnet_password":this.f_telnet_password,
      "ip":this.f_ip,
      "province":this.f_province,
      "city":this.f_city,
      "telecom":this.f_telecom,
      "connection_type":this.f_connection_type,
      "fqdn":this.f_fqdn,
      "dslam_long":this.f_dslam_long,
      "dslam_lat":this.f_dslam_lat,
    });
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }
  search_str = '';
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
  dslam_show_info = [];
  permission = [];
  progressSpinner: boolean = false;
  user_permission;
  pageChange_srch(page) {
    console.log(page);
    this.pagination_config.currentPage = page;
    this.get_all_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

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



  add_dslam() {
    console.log(this.form.value);
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

  get_all_dslams(page, itemsPerPage) {
    this.progressSpinner = true;
    this.dslamSrv.get_all_dslams(page, itemsPerPage).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listDslams = res.results;
      this.progressSpinner = false;
    });
  }

  search_dslams(page, itemsPerPage, search_dslams) {
    this.dslamSrv.search_dslams(page, itemsPerPage, search_dslams).then(srch_res => {
      this.pagination_config.totalItems = srch_res.count;
      this.listDslams = srch_res.results;
    });
  }

  get_province_by_name(event) {
    this.citySrv.get_province_by_name(event.query).then(prov_res => {
      this.listProvince = prov_res.results;
    });
  }

  get_city_by_name(event) {
    this.citySrv.get_city_by_name(event.query).then(prov_res => {
      this.listCites = prov_res.results;
    });
  }

  getTelecomCenterByCityId(city_id){
    console.log(city_id);
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
  ngOnInit(): void {
    let loggedIn = localStorage.getItem('loggedin');
    if(!Boolean(loggedIn)){
      this.router.navigate(['/login']);
    }
    this.get_permission();
    this.get_all_dslams(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
    this.primengConfig.ripple = true;
  }
}
