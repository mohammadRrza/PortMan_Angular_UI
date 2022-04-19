import { Component, OnInit } from '@angular/core';
import { PartakService} from '../../../services/partak.service';
import {DslamService} from '../../../services/dslam.service';
import {CommandService} from '../../../services/command.service';
import {DslamPortService} from '../../../services/dslam-port.service'
import {PortManCDMSService} from '../../../services/portman-cdms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-partak-fqdns',
  templateUrl: './update-partak-fqdns.component.html',
  styleUrls: ['./update-partak-fqdns.component.css']
})
export class UpdatePartakFqdnsComponent implements OnInit {

  constructor(private partatSrv:PartakService,
    private portman_cdmsSrv: PortManCDMSService,
              private dslamSrv: DslamService,
              private comSrv: CommandService,
              private dslamPortsrv: DslamPortService,
              private router: Router) { }
  prov_list = [];
  prov_id: number;
  prov_keyword = 'ProvinceName';
  city_list = [];
  keyword = 'name';
  city_id:number;
  city_keyword = 'CityName';
  telecom_list = [];
  telecom_id:number;
  telecom_keyword = 'MdfName';
  dslam_list = [];
  dslam_id:number;
  dslam_keyword = 'Slat';
  dslam_info;
  portman_fqdns = [];
  fqdn;
  slat: number;
  commandObj;
  ldap_permissions;
  is_ldap_login;
  ldap_email;
  comm_item;
  command_res_show: boolean =  false;
  profile_adsl_set: boolean =  false;
  show_mac_by_slot_port: boolean =  false;
  command_res: boolean =  false;
  custom_slot: number = 0;
  custom_port: number = 0;
  new_lineprofile:string = '';
  show_slot_port: boolean =  false;

  run_command(command_obj){
    console.log(command_obj);
    this.command_res_show = false;
    this.profile_adsl_set = false;
    this.show_mac_by_slot_port = false;
    var card = this.custom_slot;
    var port = this.custom_port;

    if(command_obj.type='port'){
        if(command_obj.name == 'profile adsl set' || command_obj.name == 'setPortProfiles'){
          this.profile_adsl_set = true;
          
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false,"new_lineprofile":"' +this.new_lineprofile+ '","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '"}';
        }
    // else if(command_obj.name == 'show mac by slot port'){
    //     var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
    //   }
    else
      {
          this.profile_adsl_set = false;
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
        }
    }
    else if(command_obj.type='dslam'){
      var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"0","port_number":"0"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
    }
    this.dslamSrv.run_command(command_str).then(res => {
      this.command_res = res.response.result?res.response.result:res.response?res.response:res.response;
      this.command_res_show = true;
  });
  }
  prov_selectEvent(item) {
    this.prov_id = item.ProvinceID;
  }

  prov_onChangeSearch(search: string) {
  }

  prov_onFocused(e) {
    this.get_partak_provinces();
  }

  get_partak_provinces(){
    this.partatSrv.get_partak_provinces().then(res=>{
      this.prov_list = res.ProvinceList;
    });
  }

  city_selectEvent(item) {
    this.city_id = item.CityID;
    this.get_partak_telecom_by_city_id(this.city_id);
  }

  city_onChangeSearch(search: string) {
  }

  city_onFocused(item) {
    this.get_partak_cities_by_province_id(this.prov_id);

  }

  get_partak_cities_by_province_id(province_id){
    this.partatSrv.get_partak_cities_by_province_id(province_id).then(res=>{
      this.city_list = res.CityList;
      console.log(this.city_list);
    });
  }

  telecom_selectEvent(item) {
    this.telecom_id = item.MdfID;
    this.get_partak_dslam_list_by_telecom_id(this.telecom_id);
  }

  telecom_onChangeSearch(search: string) {
  }

  telecom_onFocused(item) {
    this.get_partak_telecom_by_city_id(this.city_id);
  }

  get_partak_telecom_by_city_id(city_id){
    this.partatSrv.get_partak_telecoms_by_city_id(city_id).then(res=>{
      this.telecom_list = res.MdfList; 
    });
  }

  get_partak_dslam_list_by_telecom_id(telecom_id){
    this.partatSrv.get_partak_dslam_list_by_telecom_id(telecom_id).then(res=>{
      this.dslam_list = res.DslamList;
    });
  }

  dslam_selectEvent(event) {
    this.dslam_list.forEach(item => {
      if(item.Slat === event.Slat){
        this.dslam_info = item;
        this.slat = this.dslam_info.Slat;
        this.get_dslam_id_by_fqdn(this.dslam_info.FQDN);

        return;
      }

    });
  }

  dslam_onChangeSearch(search: string) {
  }

  dslam_onFocused(item) {
    this.get_partak_dslam_list_by_telecom_id(this.telecom_id);
  }

  update_fqdn(){
    this.update_partak_fqdn(this.telecom_id, this.slat, this.fqdn.fqdn);
  }

  update_partak_fqdn(mdf_id, slat, fqdn){
    this.partatSrv.update_partak_fqdn(mdf_id, slat, fqdn).then(res=>{
      this.partatSrv.get_partak_dslam_list_by_telecom_id(this.telecom_id).then(res=>{
        this.dslam_list = res.DslamList;
        this.dslam_list.forEach(item => {
          if(item.Slat === slat){
            this.dslam_selectEvent(item);
          }
    
        });
      });

    });
  }

  commands_selectEvent(event){
      this.comm_item = event;
      console.log(event);
      if(event.type == 'port'){
        this.show_slot_port = true;
      }
      else{
        this.show_slot_port = false;
      }
      if(event.name == 'profile adsl set' || event.name == 'setPortProfiles'){
        this.profile_adsl_set = true;        
      }
      else
      {
        this.profile_adsl_set = false;        
      }
  }
  commands_onChangeSearch(event){

  }

  commands_inputFocused(event){
    this.get_all_commands_by_email(this.dslam_id,this.ldap_email,this.is_ldap_login)
  }

  get_all_commands(dslam_id, username, ldap_login){
    this.comSrv.load_all_commands(dslam_id, username, ldap_login).then(res=>{
      this.commandObj = res;
    });
  }

  get_all_commands_by_email(dslam_id, ldap_email, ldap_login){
    this.comSrv.get_all_commands_by_email(dslam_id, ldap_email, ldap_login).then(res=>{
      this.commandObj = res;
    });
  }

  get_dslam_id_by_fqdn(fqdn){
    this.portman_cdmsSrv.get_dslam_id_by_fqdn(fqdn).then(res=>{
      this.dslam_id = res.dslam_id;
    });
  }

  search_fqdns(event){
    this.partatSrv.search_fqdns(event.query).then(res=>{
      this.portman_fqdns = res.portman_fqdn;
    });
  }


  
  ngOnInit(): void {
    this.ldap_permissions = localStorage.getItem('ldap_permissions');
    this.is_ldap_login = localStorage.getItem("ldap_login");
    this.ldap_email = localStorage.getItem("ldap_email").toLowerCase();

  }

}
