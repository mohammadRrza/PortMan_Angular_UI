import { Component, OnInit } from '@angular/core';
import { VlanService } from '../../../services/vlan.service';
import {ConfirmationService} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResellerService } from '../../../services/reseller.service';


@Component({
  selector: 'app-vlan-management',
  templateUrl: './vlan-management.component.html',
  styleUrls: ['./vlan-management.component.css']
})
export class VlanManagementComponent implements OnInit {

  constructor(private VlanSrv: VlanService,
    private resellerSrv : ResellerService,
    private confirmationService: ConfirmationService,
    fb: FormBuilder
    ) {   
      this.pagination_config = {
     itemsPerPage: 10,
     currentPage: 1,
     totalItems: 0
   }; 
   this.form = fb.group({
    "vlan_name": this.f_vlan_name,
    "vlan_id":this.f_vlan_id,
  });
  this.assigne_form = fb.group({
    "f_vlan_name": this.form_vlan_name,
    "reseller":this.form_reseller,
  });

  this.assigne_form_subs = fb.group({
    "form_vlan_name": this.vlan_name,
    "subscriber":this.subscriber,
  });

  this.filters = [
    {name: 'Filter by Reseller' , code: 1},
    {name: 'Filter by Identifier Key' , code: 2},
    {name: 'Filter by card-port' , code: 3},
  ];

  this.flag = [
    {name: 'All'},
    {name: 'Vlan'},
    {name: 'No Vlan'},
  ];
  }
  vlans = [];
  pagination_config;
  checked: boolean = true;
  vlan_edit: any = {};
  form: FormGroup;
  assigne_form: FormGroup;
  assigne_form_subs: FormGroup;
  subscriber = new FormControl("", Validators.required);
  vlan_name = new FormControl("", Validators.required);
  agreed = new FormControl("", Validators.required);
  f_vlan_name = new FormControl("", Validators.required);
  f_vlan_id = new FormControl("", Validators.required);
  form_vlan_name = new FormControl("", Validators.required);
  form_reseller = new FormControl("", Validators.required);
  names = {};
  vlan_keyword = 'vlan_name';
  reseller_keyword = 'name'
  listResellers = [];
  filters = [];
  flag = [];
  is_ldap_login;
  agent_username: string;
  ldap_email: string;
  selectfilter : any;
  reseler_obj : boolean = false;
  identifierkey_obj: boolean = false;
  card_port_obj: boolean = false;
  progressSpinner: boolean = false;
  notFoundTemplate: any;
  
  paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_all_vlan(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  search_vlans(search_elem,type){
    if(type == 2){
      this.progressSpinner = true;
      this.VlanSrv.search_vlans(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"vlan_id="+search_elem).then(res=>{
        this.vlans =  res.results;
        this.pagination_config.totalItems = res.count;
        this.progressSpinner = false;
      });
    }
    else if(type == 3){
      this.progressSpinner = true;
      this.VlanSrv.search_vlans(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,"vlan_name="+search_elem).then(res=>{
        this.vlans =  res.results;
        this.pagination_config.totalItems = res.count;
        console.log(this.pagination_config.totalItems)
        this.progressSpinner = false;
      });
    }
  }
  
  onSearch(){}
  
  get_filter(event){
    let filter_code = event.value.code;
    switch(filter_code) { 
      case 1: { 
        this.reseler_obj = true;
        this.identifierkey_obj = false;
        this.card_port_obj = false; 
        break; 
      } 
      case 2: { 
        this.reseler_obj = false;
        this.identifierkey_obj = true;
        this.card_port_obj = false; 
        break; 
      }
      case 3: { 
        this.reseler_obj = false;
        this.identifierkey_obj = false;
        this.card_port_obj = true; 
        break; 
      } 
      default: {  
         break; 
      } 
   } 
  }

  search_reseller(search_elem,type){
    if(type == 1){
      this.progressSpinner = true;
      this.resellerSrv.search_reseller(this.pagination_config.currentPage, this.pagination_config.itemsPerPage,search_elem).then(res=>{
        this.listResellers =  res.results;
        this.pagination_config.totalItems = res.count;
        this.progressSpinner = false;
        // for reseller name
      });
    }
  }

  AssignValnToReseller(reseller_info){
    this.VlanSrv.AssignValnToReseller(JSON.stringify(reseller_info.value),reseller_info.f_vlan_name.id).then(res => {
        this.vlan_edit = res;
        this.get_all_vlan(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
    });
  }

  assign_vlan_to_subscriber(form_obj){

  }

  onChangeSearch(event,type){
    if(type == 1){
      this.search_vlans(event,3)
    }
    else if(type==2){
      this.search_reseller(event,1)
    }
  }

  selectEvent(item){
    console.log(item)
    
  }

  onFocused(event,type){
    console.log(type)
    if(type == 1){
      this.get_all_vlan(this.pagination_config.currentPage, this.pagination_config.itemsPerPage); 
    }
    else if(type == 2){
      this.get_all_resellers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage)
      console.log(this.resellerSrv.get_all_resellers(this.pagination_config.currentPage, this.pagination_config.itemsPerPage))
    }
  }

  get_all_resellers(page, page_size) {
    this.resellerSrv.get_all_resellers(page, page_size).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listResellers = res.results;
    });
  }

  remove_vlan(vlan_id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this Vlan?',
        accept: () => {
          this.VlanSrv.remove_vlan(vlan_id).then(res => {
            this.vlan_edit = res;
            this.get_all_vlan(this.pagination_config.currentPage,10);
          });
        }
    });
    console.log(this.vlan_edit)
  }
  create_vlan(form_vlan_obj){
    console.log(form_vlan_obj.value)
    this.VlanSrv.create_vlan(JSON.stringify(form_vlan_obj.value)).then(res => {
        this.vlan_edit = res;
      this.get_all_vlan(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
    });
  }
  get_all_vlan(page,itemsPerPage){
    this.progressSpinner = true;
    this.VlanSrv.get_all_vlan(page,itemsPerPage).then(res=>{
      this.vlans = res.results;
      this.pagination_config.totalItems = res.count;
      console.log(this.vlans);
      this.progressSpinner = false;
    });
  }

  ngOnInit(): void {
    
    this.is_ldap_login = localStorage.getItem("ldap_login");
    this.agent_username = localStorage.getItem("username")?localStorage.getItem("username"):'';
    this.ldap_email = localStorage.getItem("ldap_email")?localStorage.getItem("ldap_email").toLowerCase():'';
    this.get_all_vlan(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }
}
