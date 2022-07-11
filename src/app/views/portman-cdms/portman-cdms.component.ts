import { Component, OnInit} from '@angular/core';
import {PortManCDMSService} from '../../../services/portman-cdms.service';
import {DslamService} from '../../../services/dslam.service';
import {CommandService} from '../../../services/command.service';
import {DslamPortService} from '../../../services/dslam-port.service'
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {Subscription, timer} from 'rxjs';  
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-portman-cdms',
  templateUrl: './portman-cdms.component.html',
  styleUrls: ['./portman-cdms.component.css']
})
export class PortmanCdmsComponent implements OnInit {

  constructor(private portman_cdmsSrv: PortManCDMSService,
              private dslamSrv: DslamService,
              private comSrv: CommandService,
              private dslamPortsrv: DslamPortService,
              private router: Router,
              private messageSrv: MessageService
              ) {
                this.pagination_config = {
                  itemsPerPage: 10,
                  currentPage: 1,
                  totalItems: 0
                };
               }

  username:string = '';
  commandObj = [];
  keyword = 'name';
  keyword2 = 'device_fqdn';
  display_dslam_ping:boolean = false;
  data: any;
  port_infos;
  responseStatus: any = {};
  dslam_id;
  dslam_ip: string;
  command_res;
  snmp_card: number;
  snmp_port: number;
  comm_item;
  timerSubscription: Subscription; 
  timerSubscription2: Subscription; 
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
  pind_res;
  ping_res_show:boolean = true;
  user_does_not_exist:boolean = false;
  portman_users = []
  show_mac_by_slot_port:boolean = false;
  show_custom_port: boolean = false;;
  custom_slot:number;
  custom_port: number;
  port_register_res: any;
  view_live_user_port:boolean = false;
  view_run_command_details_dialog:boolean = false;
  snmp_data: any;
  snmp_port_status_res: any;
  ADSL_CURR_DOWNSTREAM_RATE = [0];
  ADSL_CURR_UPSTREAM_RATE = [0];
  ADSL_DOWNSTREAM_SNR = [0];
  ADSL_UPSTREAM_SNR = [0];
  TIME = [];
  pagination_config: any;
  command_histories = [];
  operator = localStorage.getItem("username");
  command_history_detail = {};
  
  get_port_info(){
    this.user_does_not_exist = false;
    this.run_by_ip = false;
    this.portman_cdmsSrv.get_port_info(this.username).then(res=>{
      this.port_infos = res.CustomerInfo;
      this.responseStatus = res.ResponseStatus;
      if(res.ResponseStatus.ErrorCode != 0){
        this.user_does_not_exist = true;
      }
      else{
        this.user_does_not_exist = false;
        this.get_dslam_id_by_fqdn(this.port_infos.FQDN);
        this.get_command_history('0'+this.username, this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
      }
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
  run_command_on_custom_port(command){
    this.run_command_on_custom_port2(command, this.custom_slot, this.custom_port)
  }

  run_command_on_custom_port2(command_obj, card, port){
    this.command_res_show = false;
    this.profile_adsl_set = false;
    this.show_mac_by_slot_port = false;
    console.log(this.new_lineprofile)
    if(command_obj.type='port'){
        if(command_obj.name == 'profile adsl set' || command_obj.name == 'setPortProfiles'){
          this.profile_adsl_set = true;
          
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false, "request_from_ui": true, "operator": "'+this.operator+'", "username": "0'+this.username+'","new_lineprofile":"' +this.new_lineprofile+ '","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '"}';
        }
        else if(command_obj.name == 'fast profiles adsl set'){
          this.profile_adsl_set = true;
          
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false, "request_from_ui": true,"operator": "'+this.operator+'", "username": "0'+this.username+'","new_lineprofile":"' +this.new_lineprofile+ '","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '"}';
        }
    // else if(command_obj.name == 'show mac by slot port'){
    //     var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
    //   }
    else
      {
          this.profile_adsl_set = false;
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false, "request_from_ui": true,"operator": "'+this.operator+'", "username": "0'+this.username+'","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
        }
    }
    else if(command_obj.type='dslam'){
      var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false, "request_from_ui": true, "operator": "'+this.operator+'", "username": "0'+this.username+'","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"0","port_number":"0"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
    }
    this.dslamSrv.run_command(command_str).then(res => {
      this.command_res = res.response.result?res.response.result:res.response?res.response:res.response;
      this.command_res_show = true;
  });
  this.get_command_history('0'+this.username, this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
}
  
  run_command(command_obj, card, port){
    console.log(command_obj.name);
    this.command_res_show = false;
    this.profile_adsl_set = false;
    this.show_mac_by_slot_port = false;
    console.log(this.new_lineprofile)
    if(command_obj.type='port'){
        if(command_obj.name == 'profile adsl set' || command_obj.name == 'setPortProfiles'){
          this.profile_adsl_set = true;
          
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false,"request_from_ui": true, "operator": "'+this.operator+'", "username": "0'+this.username+'","new_lineprofile":"' +this.new_lineprofile+ '","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '"}';
        }
        else if(command_obj.name == 'fast profiles adsl set'){
          this.profile_adsl_set = true;
          
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false, "request_from_ui": true,"operator": "'+this.operator+'", "username": "0'+this.username+'","new_lineprofile":"' +this.new_lineprofile+ '","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '"}';
        }
    // else if(command_obj.name == 'show mac by slot port'){
    //     var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
    //   }
    else
      {
          this.profile_adsl_set = false;
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam_port","is_queue":false, "request_from_ui": true,"operator": "'+this.operator+'", "username": "0'+this.username+'","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
        }
    }
    else if(command_obj.type='dslam'){
      var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false, "request_from_ui": true,"operator": "'+this.operator+'", "username": "0'+this.username+'","dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"0","port_number":"0"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
    }
    this.dslamSrv.run_command(command_str).then(res => {
      this.command_res = res.response.result?res.response.result:res.response?res.response:res.response;
      this.command_res_show = true;
  });
  this.get_command_history('0'+this.username, this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

  register_port(){
    var command_str = '';
    this.dslamPortsrv.register_port(command_str).then();

  }

  view_run_command_details(command_history_id){
    this.view_run_command_details_dialog = true;
    this.command_histories.forEach(element => {
      if(element.id == command_history_id)
      this.command_history_detail = element;
    });
    console.log(this.command_history_detail);

  }

  run_command_by_ip(ip, command_obj, card, port){
    this.portman_cdmsSrv.get_dslam_id_by_ip(ip).then(res=>{
      this.dslam_id = res.dslam_id;
      this.run_command(command_obj, card, port);
    });
  }

  selectEvent(item){
    console.log(item.name);
    this.profile_adsl_set = false;
    // this.show_mac_by_slot_port = false;
    if(item.name == 'profile adsl set' || item.name == 'setPortProfiles'){
      this.profile_adsl_set = true;
      this.comm_item = item;
    }
    else if(item.name == 'fast profiles adsl set'){
      this.profile_adsl_set = true;
      this.comm_item = item;
      
    }

    // else if(item.name == 'show'){
    //   this.show_mac_by_slot_port = true;
    // }
    else{
      this.profile_adsl_set = false;
      this.comm_item = item; 
    }

   }
  
   show_custom_port_event(event){
    this.show_custom_port = event.checked;
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
      bulk_username = item.split('@')[0].toLowerCase();
      password = item.split('@')[0]+'@1577'.toLowerCase();
      confirm_password = item.split('@')[0]+'@1577'.toLowerCase();
      email = item.toLowerCase();
      var user_str = '{"username":"'+bulk_username+'","first_name":"'+bulk_username+'","last_name":"'+bulk_username+'","email":"'+email+'","tel":"2115770000","reseller":"","password":"'+password+'","confirm_password":"'+password+'","is_active":true,"type":"SUPPORT"}';
      this.portman_cdmsSrv.add_bulk_users_to_portman(user_str).then(res=>{
      });

    });
  }

  set_permission_for_user(){
    this.portman_users.forEach(item=>{
      this.portman_cdmsSrv.set_permission_for_user(item.toLowerCase()).then();
    });
  }

  ping_dslam(){
    this.display_dslam_ping = true;
    this.ping_res_show = false;
    var ping_str = '{"params":{"count":4,"timeout":0.2},"dslam_id":"'+this.dslam_id+'","icmp_type":"ping"}'
    this.portman_cdmsSrv.ping_dslam(ping_str).then(res=>{
      this.pind_res = res.result;
      this.ping_res_show = true;
    });

  }

  port_config(fqdn, card, port, reseller_name,username){
    let port_config_str = '{"port":{"fqdn":"'+fqdn+'","card_number":"'+card+'","port_number":"'+port+'"},"reseller":{"name":"'+reseller_name+'"},"subscriber":{"username":"'+username+'"}}';
    console.log(port_config_str);
    this.portman_cdmsSrv.port_register(port_config_str).then(res=>{
      this.port_register_res = res;
      if(this.port_register_res.id == 201){
        this.messageSrv.add({severity:'success', summary:'Port Registration', detail:'port config has been done.'});
      }
      else{
        this.messageSrv.add({severity:'info', summary:'Port Registration', detail:'port config has been failed.'});

      }
    });
  }

  view_live_user_port_func(fqdn, card, port){
    this.snmp_card = card;
    this.snmp_port = port;
  this.view_live_user_port = true;


  }


  show_snmp_data(){
    this.snmp_data = {
      labels: this.TIME,
      datasets: [
          {
              label: 'Downstream Rate',
              backgroundColor: 'rgba(161, 247, 237, 0.8)',
              tension: 0.4,
              data: this.ADSL_CURR_DOWNSTREAM_RATE,
          },
          {
              label: 'Upstream Rate',
              backgroundColor: 'rgba(129, 177, 232, 0.8)',
              tension: 0.4,
              data: this.ADSL_CURR_UPSTREAM_RATE,
          }
      ]
  }
  }
  show_snmp_data_refresh(){
    var command_str = '{"dslam_id":"' + this.dslam_id + '","params":{"type":"dslam_port","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+this.snmp_card+'","port_number":"'+this.snmp_port+'"}},"command":"snmp get port params","new_lineprofile":""}';
    this.timerSubscription = timer(0, 1000).pipe( 
      map(() => { 
        this.dslamPortsrv.get_snmp_port_status(command_str).then((res)=>{
          this.snmp_port_status_res = res.response.result;
          this.ADSL_CURR_DOWNSTREAM_RATE.push(this.snmp_port_status_res.ADSL_CURR_DOWNSTREAM_RATE);
          this.ADSL_CURR_UPSTREAM_RATE.push(this.snmp_port_status_res.ADSL_CURR_UPSTREAM_RATE);
          this.TIME.push(this.snmp_port_status_res.TIME);
     });
      })
    ).subscribe();    
    this.timerSubscription2 = timer(0, 1000).pipe( 
      map(() => { 
        this.show_snmp_data();
      })
    ).subscribe(); 
  }
  stop_snmp_get() {
    console.log('stop_snmp_get');
    this.timerSubscription.unsubscribe();
    this.timerSubscription2.unsubscribe();
    // this.ADSL_CURR_DOWNSTREAM_RATE = [];
    // this.ADSL_CURR_UPSTREAM_RATE = [];
    // this.TIME = [];

  }

  get_command_history(username, currentPage, page_size){
    this.portman_cdmsSrv.get_command_history(username, currentPage, page_size).then(res=>{
      this.command_histories = res.results;
    });
  }

  ngOnInit(): void {
    this.ldap_permissions = localStorage.getItem('ldap_permissions');
    this.is_ldap_login = localStorage.getItem("ldap_login");
    console.log(this.is_ldap_login);
 }
}
