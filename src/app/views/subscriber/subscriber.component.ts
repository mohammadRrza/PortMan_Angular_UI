import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SubscriberService } from '../../../services/subscriber.service';
import {LoginCls} from '../../dtos/login_cls';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { porv_city} from '../../dtos/city_dto';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResellerService } from '../../../services/reseller.service';
import {MenuItem} from 'primeng/api';
import { CityService } from '../../../services/city.service';
import { VlanService } from '../../../services/vlan.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  constructor(
    private SubServis:SubscriberService,
    private resellerSrv : ResellerService,
    private citySrv: CityService,
    private VlanSrv: VlanService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    fb: FormBuilder
  ) { 
    this.add_subs_from = this.formBuilder.group({
      firstname : new FormControl("", Validators.required),
      lastname : new FormControl("", Validators.required),
      email : new FormControl("", Validators.required),
      id : new FormControl("", Validators.required),
      identifier_key : new FormControl("", Validators.required),
      mobile : new FormControl("", Validators.required),
      national_code : new FormControl("", Validators.required),
      tel : new FormControl("", Validators.required),
      telecom_center_id : new FormControl("", Validators.required),
      username : new FormControl("", Validators.required),
      vlan : new FormControl("", Validators.required),
      reseller : new FormControl("", Validators.required),
      city_info : new FormControl("", Validators.required),
      telecom_center : new FormControl("", Validators.required),
    });

    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    }; 
  }
  items: MenuItem[];
  pagination_config;
  subs:[];
  vlans:[];
  subscriber_info = '';
  search_str = '';
  submitted = false;
  subs_edit: any = {};
  subs_add: any = {};
  displayMaximizable: boolean = false;
  displayMaximizable_add: boolean = false;
  add_subs_from: FormGroup;
  step_one: boolean = false;
  prov_id;
  name: porv_city;
  listCites: porv_city[] = [];
  listResellers = [];
  listprov: porv_city[] = [];
  city_text: string;
  city_id: number;
  vlan_keyword = 'vlan_name';
  reseller_keyword = 'name';
  telecomcenter_keyword = 'telecomcenter_name';
  telecom_centers = [];
  step: number = 1;
  subscription: any;
  progressSpinner: boolean = false;
  is_ldap_login;
  agent_username: string;
  ldap_email: string;


  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_all_subscriber(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  add_subs(){
    this.displayMaximizable_add = true;
  }

  get_city_by_name(parent_id) {
    this.prov_id = parent_id
    this.SubServis.get_city_by_name(parent_id).then(city_res => {
      this.listCites = city_res.results;
    });
  }

  nextPage() {
    this.step = this.step + 1
    console.log(this.step)
  }

  previous(){
    this.step = this.step - 1
  }

  getProvinces(event){
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
    });
  }

  get_city(event){
    this.city_text = event.text;
    this.city_id = event.id;

  }

  edit_subscriber(sub_id){
    this.SubServis.edit_subscriber(sub_id).then(res => {
      this.subs_edit = res;
      this.displayMaximizable = true; 
    });
   
  }

  apply_edit(){
    let param_str = '{"email":"'+this.subs_edit.email+'","firstname":"'+this.subs_edit.firstname+'","id":'+parseInt(this.subs_edit.id)+',"identifier_key":"'+this.subs_edit.identifier_key+'","lastname":"'+this.subs_edit.lastname+'","mobile":"'+this.subs_edit.mobile+'","national_code":"'+this.subs_edit.national_code+'","tel":"'+this.subs_edit.tel+'","telecom_center_id":'+parseInt(this.subs_edit.telecom_center_id)+',"username":"'+this.subs_edit.username+'"}'
    this.SubServis.apply_edit_subscriber(this.subs_edit.id, param_str).then(res=>{
      this.edit_subscriber(this.subs_edit.id);
      this.get_all_subscriber(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
    });
  }

  remove_subscriber(sub_id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Subscriber?',
      accept: () => {
        this.SubServis.remove_subscriber(sub_id).then(res => {
          this.subs_edit = res;
          this.get_all_subscriber(this.pagination_config.currentPage,10);
        });
      }
    });
  }

  get_reseller_name(search_elem){
    this.resellerSrv.search_reseller(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,search_elem).then(res=>{
      this.listResellers =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  search_vlans(search_elem){
    this.VlanSrv.search_vlans(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"vlan_name="+search_elem).then(res=>{
      this.vlans =  res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  onChangeSearch(event,type){
    if(type == 1){
      this.search_vlans(event)
    }
    else if(type==2){
      this.get_reseller_name(event)
    }
  }

  onChange(event){
    console.log(event)
  }

  apply_add_subs(form_subs_obj){
    console.log("=====================================")
    console.log(form_subs_obj)
    if (this.step == 3) {
      form_subs_obj.value.city = this.city_id;
    this.SubServis.create_subscriber(JSON.stringify(form_subs_obj.value)).then(res => {
      this.subs_edit = res;
      this.get_all_resellers(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
      
    });
    }
  }

  selectEvent(item){
    console.log(item)
  }

  onFocused(event,type){
    if(type == 1){
      this.get_all_vlan(this.pagination_config.currentPage, this.pagination_config.itemsPerPage); 
    }
    else if(type == 2){
      this.get_all_resellers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage)
    }
  }

  get_all_vlan(page,itemsPerPage){
    this.VlanSrv.get_all_vlan(page,itemsPerPage).then(res=>{
      this.vlans = res.results;
      this.pagination_config.totalItems = res.count;
    });
  }

  get_all_resellers(page, page_size) {
    this.resellerSrv.get_all_resellers(page, page_size).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listResellers = res.results;
    });
  }

  get_all_subscriber(page,itemsPerPage){
    this.progressSpinner = true;
    this.SubServis.get_all_subscriber(page,itemsPerPage).then(res=>{
      this.subs = res.results;
      this.pagination_config.totalItems = res.count;
      this.progressSpinner = false;
    });
  }

  ngOnInit(): void {

    this.is_ldap_login = localStorage.getItem("ldap_login");
    this.agent_username = localStorage.getItem("username")?localStorage.getItem("username"):'';
    this.ldap_email = localStorage.getItem("ldap_email")?localStorage.getItem("ldap_email").toLowerCase():'';
    this.get_all_subscriber(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }
}
