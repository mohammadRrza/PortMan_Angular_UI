import { Component, OnInit } from '@angular/core';
import {PortManCDMSService} from '../../../services/portman-cdms.service'
import {DslamService} from '../../../services/dslam.service'
import {CommandService} from '../../../services/command.service'

@Component({
  selector: 'app-portman-cdms',
  templateUrl: './portman-cdms.component.html',
  styleUrls: ['./portman-cdms.component.css']
})
export class PortmanCdmsComponent implements OnInit {

  constructor(private portman_cdmsSrv: PortManCDMSService,
              private dslamSrv: DslamService,
              private comSrv: CommandService
              ) { }

  username:string = '';
  commandObj = [];
  keyword = 'name';
  keyword2 = 'device_fqdn';

  data: any;
  port_infos;
  responseStatus = {};
  dslam_id;
  dslam_ip: string;
  command_res;
  comm_item;
  slot:string;
  port:string;
  zabbix_fqdn:string;
  run_by_ip: boolean;
  zabbix_fqdns=[];
  new_lineprofile:string = '';
  profile_adsl_set: boolean = false;
  command_res_show: boolean = true;
  agent_username: string;
  ldap_permissions;
  is_ldap_login;
  ldap_email;
  portman_users = [
    'v.oruji@pishgaman.net',
    'h.ansari@pishgaman.net',
    's.ebrahimzadeh@pishgaman.net']
  get_port_info(){
    this.run_by_ip = false;
    this.portman_cdmsSrv.get_port_info(this.username).then(res=>{
      this.port_infos = res.CustomerInfo;
      this.responseStatus = res.ResponseStatus;
      this.get_dslam_id_by_fqdn(this.port_infos.FQDN);
    });
  }

  get_dslam_id_by_fqdn(fqdn){
    this.portman_cdmsSrv.get_dslam_id_by_fqdn(fqdn).then(res=>{
      this.dslam_id = res.dslam_id;
    });
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

  run_command(command_obj, card, port){
    this.command_res_show = false;
    console.log(this.new_lineprofile)
    if(command_obj.type='port'){
        if(command_obj.name == 'profile adsl set' || command_obj.name == 'setPortProfiles'){
          this.profile_adsl_set = true;
          
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":"' +this.new_lineprofile+ '"}';
        }
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

  run_command_by_ip(ip, command_obj, card, port){
    this.portman_cdmsSrv.get_dslam_id_by_ip(ip).then(res=>{
      this.dslam_id = res.dslam_id;
      this.run_command(command_obj, card, port);
    });
  }

  selectEvent(item){
    if(item.name == 'profile adsl set' || item.name == 'setPortProfiles'){
      this.profile_adsl_set = true;
      this.comm_item = item;
    }
    else{
      this.profile_adsl_set = false;
      this.comm_item = item; 
    }

   }
  
  onChangeSearch(event){
    console.log('nChangeSearch');

  }

  onFocused(event){
    if(this.is_ldap_login == 'true'){
      console.log(this.is_ldap_login);
      this.ldap_email = localStorage.getItem("ldap_email").toLowerCase();
      this.get_all_commands_by_email(this.dslam_id, this.ldap_email, true); 
    }
    else{
      this.agent_username = localStorage.getItem("username");
      this.get_all_commands(this.dslam_id, this.agent_username, false); 
      }

  }

  
  get_fqdn_from_zabbix_by_ip(ip){
    this.portman_cdmsSrv.get_fqdn_from_zabbix_by_ip(ip).then(res=>{
      this.zabbix_fqdn = res.zabbix_fqdn[3]
    });
  }

  get_fqdn_from_zabbix(fqdn){
    this.portman_cdmsSrv.get_fqdn_from_zabbix(fqdn).then(res=>{
      this.zabbix_fqdns = res.zabbix_hosts;
      console.log(res.zabbix_hosts);
    });
  }

  fqdn_selectEvent(item){
    console.log('fqdn_selectEvent');
   }
  
   fqdn_onChangeSearch(event){
    this.get_fqdn_from_zabbix(event);
  }

  fqdn_onFocused(event){
    console.log('fqdn_onFocused');

  }

  add_bulk_users_to_portman(){

    let bulk_username ="";
    let password ="";
    let confirm_password ="";
    let email ="";
    this.portman_users.forEach(item=>{
      bulk_username = item.split('@')[0];
      password = item.split('@')[0]+'@1577';
      confirm_password = item.split('@')[0]+'@1577';
      email = item;
      var user_str = '{"username":"'+bulk_username+'","first_name":"'+bulk_username+'","last_name":"'+bulk_username+'","email":"'+email+'","tel":"2115770000","reseller":"","password":"'+password+'","confirm_password":"'+password+'","is_active":true,"type":"SUPPORT"}';
      this.portman_cdmsSrv.add_bulk_users_to_portman(user_str).then(res=>{
      });

    });
  }

  set_permission_for_user(){
    this.portman_users.forEach(item=>{
      this.portman_cdmsSrv.set_permission_for_user(item).then();
    });
  }

  ngOnInit(): void {
     this.ldap_permissions = localStorage.getItem('ldap_permissions');
     this.is_ldap_login = localStorage.getItem("ldap_login")
     console.log(this.is_ldap_login);

  }

}
