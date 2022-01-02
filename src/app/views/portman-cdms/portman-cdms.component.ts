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

  get_all_commands(dslam_id){
    this.comSrv.load_all_commands(dslam_id).then(res=>{
      this.commandObj = res;
    });
  }

  run_command(command_obj, card, port){
    if(command_obj.type='port'){
        if(command_obj.name == 'profile adsl set'){
          this.profile_adsl_set = true;
          
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":"' +this.new_lineprofile+ '"}';
        }
        else
        {
          this.profile_adsl_set = false;
          var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+card+'","port_number":"'+port+'"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
        }
    }
    else if(command_obj.type='dslam'){
      var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"0","port_number":"0"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
    }
    this.dslamSrv.run_command(command_str).then(res => {
      this.command_res = res.response.result?res.response.result:res.Result.result?res.Result.result:res.result?res.result:res.Result;
  });
  }
  run_command_by_ip(ip, command_obj, card, port){
    this.portman_cdmsSrv.get_dslam_id_by_ip(ip).then(res=>{
      this.dslam_id = res.dslam_id;
      this.run_command(command_obj, card, port);
    });
  }

  selectEvent(item){
    if(item.name == 'profile adsl set'){
      this.profile_adsl_set = true;
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
    this.get_all_commands(this.dslam_id); 

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


  ngOnInit(): void {
  }

}
