import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { ResellerService } from '../../../services/reseller.service';
import {LoginCls} from '../../dtos/login_cls';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { porv_city } from '../../dtos/city_dto';
import { CityService } from '../../../services/city.service';

@Component({
  selector: 'app-reseller',
  templateUrl: './reseller.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./reseller.component.css']
})
export class ResellerComponent implements OnInit {

  constructor(private resellerSrv: ResellerService,
    private citySrv: CityService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private jwtHelper: JwtHelperService,
    private router: Router,
    fb: FormBuilder
    ) {
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };

    this.add_reseller_from = fb.group({
      "name": this.f_name,
      "vci":this.f_vci,
      "vpi": this.f_vpi,
      "tel":this.f_tel,
      "fax": this.f_fax,
      "address":this.f_address,
      "city":this.f_city,
      "city_info":this.f_city_info,
    });

    this.edit_reseller_from = this.formBuilder.group({
      name : new FormControl("", Validators.required),
      vci : new FormControl("", Validators.required),
      vpi : new FormControl("", Validators.required),
      tel : new FormControl("", Validators.required),
      fax : new FormControl("", Validators.required),
      address : new FormControl("", Validators.required),
      city_info : new FormControl("", Validators.required),
      city : new FormControl("", Validators.required),
    });

  }
  cols: any[];
  pagination_config: any;
  listResellers = [];
  displayMaximizable_add: boolean = false;
  displayMaximizable_edit: boolean = false;
  reseller_edit: any = {};
  submitted = false;
  add_reseller_from: FormGroup;
  edit_reseller_from: FormGroup;
  listprov: porv_city[] = [];
  prov_id;
  listCites: porv_city[] = [];
  city_text: string;
  city_id: number;
  f_name = new FormControl("", Validators.required);
  f_vci = new FormControl("", Validators.required);
  f_vpi = new FormControl("", Validators.required);
  f_tel = new FormControl("", Validators.required);
  f_fax = new FormControl("", Validators.required);
  f_address = new FormControl("", Validators.required);
  f_city = new FormControl("", Validators.required);
  f_city_info = new FormControl("", Validators.required);
  progressSpinner: boolean = false;
  is_ldap_login;
  agent_username: string;
  ldap_email: string;

  add_reseler(){
    this.displayMaximizable_add = true;
  }

  apply_add_reseler(form_vlan_obj){
    console.log("=====================================")
    console.log(form_vlan_obj)
    form_vlan_obj.value.city = this.city_id;
    this.resellerSrv.create_reseller(JSON.stringify(form_vlan_obj.value)).then(res => {
      this.reseller_edit = res;
      this.get_all_resellers(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
    })
  }

  get_all_resellers(page, page_size) {
    this.progressSpinner = true;
    this.resellerSrv.get_all_resellers(page, page_size).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listResellers = res.results;
      this.progressSpinner = false;
    });
  }

  edit_reseller(reseller_id) {
    console.log(reseller_id)
    this.resellerSrv.edit_reseller(reseller_id).then(res => {
      this.reseller_edit = res;
      this.displayMaximizable_edit = true;
    });
  }

  apply_edit_reseller(){
    let param_str = '{"id":"'+this.reseller_edit.id+'","name":"'+this.reseller_edit.name+'","tel":"'+this.reseller_edit.tel+'","fax":"'+this.reseller_edit.fax+'",\
    "address":"'+this.reseller_edit.address+'","city":"'+this.reseller_edit.city_info.id+'","city_info":{"id":"'+this.reseller_edit.city_info.id+'","name":"'+this.reseller_edit.city_info.name+'",\
    "parent":"'+this.reseller_edit.city_info.parent+'","text":"'+this.reseller_edit.city_info.text+'","english_name":"'+this.reseller_edit.city_info.english_name+'","abbr":"'+this.reseller_edit.city_info.abbr+'"},\
    "text":"'+this.reseller_edit.text+'","vpi":"'+this.reseller_edit.vpi+'","vci":"'+this.reseller_edit.vci+'"}';
    this.resellerSrv.apply_edit_reseller(this.reseller_edit.id, param_str).then(res=>{
      this.edit_reseller(this.reseller_edit.id);
      this.get_all_resellers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
    });
  }
 
  remove_reseller(reseller_id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Reseller?',
      accept: () => {
        this.resellerSrv.remove_reseller(reseller_id).then(res => {
          this.reseller_edit = res;
          this.get_all_resellers(this.pagination_config.currentPage,10);
        });
      }
    });
  }

  getProvinces(event){
    console.log(event);
    this.citySrv.getProvinces(event.query).then(province => {
      this.listprov = province.results;
    });
  }
  get_province_id(event){
    this.prov_id = event.id;

  }

  get_cities_by_province_id() {
    this.citySrv.get_city_by_name(this.prov_id).then(city_res => {
      this.listCites = city_res.results;
      console.log(city_res.results);
    });
  }

  get_city(event){
    console.log(event);
    this.city_text = event.text;
    this.city_id = event.id;

  }
  
  get_city_by_id(event){
    this.citySrv.get_city_by_id(this.prov_id,event.query).then(city_res =>{
      this.listCites = city_res.results;
    });
  }

  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_all_resellers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  ngOnInit(): void {
    
    this.is_ldap_login = localStorage.getItem("ldap_login");
    this.agent_username = localStorage.getItem("username")?localStorage.getItem("username"):'';
    this.ldap_email = localStorage.getItem("ldap_email")?localStorage.getItem("ldap_email").toLowerCase():'';
    if(this.is_ldap_login != 'true'){
      var loginCls =  new LoginCls(this.jwtHelper,this.router);
      loginCls.check_login();
    }
    this.get_all_resellers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }
}
