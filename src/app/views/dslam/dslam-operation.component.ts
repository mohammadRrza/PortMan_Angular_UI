import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DslamService } from '../../../services/dslam.service'
import { DslamPortService } from '../../../services/dslam-port.service'
import { IcmpParam } from '../../dtos/icmp_param'
import { CommandService } from '../../../services/command.service';
import { NotificationService } from '../../../services/notification.service';
import { BandwidthService } from '../../../services/bandwidth.service';
import { Zabbix_history } from '../../dtos/zabbix_dto';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import {LoginCls} from '../../dtos/login_cls';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-dslam',
  templateUrl: './dslam-operation.component.html',
  styleUrls: ['./dslam-operation.component.css']

})
export class DslamOperationComponent implements OnInit {
  dslam_id: number;
  constructor(private dslamSrv: DslamService,
    private dslamPSrv: DslamPortService,
    private route: ActivatedRoute,
    private cmdSrv: CommandService,
    private notifySrv: NotificationService,
    private bwSrv: BandwidthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private jwtHelper: JwtHelperService

  ) {
    this.route.queryParams.subscribe(params => {
      this.dslam_id = params['dslamId'];
      this.getDslamReport(this.dslam_id);
      this.pagination_config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
      };
    });


  }
  commandObj = [];
  keyword = 'name';
  show_result: boolean = false;
  show_port_count: boolean = false;
  pagination_config: any;
  listDslamPorts = [];
  dslamInfo: any = {};
  dslamBoard = [];
  dslam_report;
  temperatures = [];
  dslamPort_info;
  dslam_ping;
  profile_adsl_show = false;
  lcman_show: boolean = false;
  show_shelf: boolean = false;
  public pieChartLabels: string[];
  public pieChartData: number[] = [21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 16, 17, 17, 12, 12, 19, 18, 15, 256];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {};
  title = 'ngrx';
  showSpinner = true;
  data: any;
  is_ldap_login: string;
  ldap_email: string;
  dslam_profiles = [];
  dslam_current_icmp;
  dslam_lcman;
  agent_username: string;
  icmp_param: IcmpParam = new IcmpParam;
  comm_item = {};
  zabbix_item_id: number = 60282;
  zabbix_histories = [];
  fifty_five_precntage = [];
  slot_count: string;
  port_count: string;
  dslam_shelf = [];
  slot_obj;
  command_res;
  P_number;
  S_number;
  ngn_dslam_ip: string = ""
  ngn_dslam_subnet_mask: string = ""
  ngn_phone_number: string = ""
  ngn_Sip_password: string = ""
  ngn_card: number = 0
  ngn_port: number = 0
  ngn_register_port_started: boolean = false;
  ngn_register_port_comlpeted: boolean = false;
  sip_configuration_started: boolean = false;
  sip_configuration_comlpeted: boolean = false;
  assign_number_to_user_started: boolean = false;
  assign_number_to_user_comlpeted: boolean = false;
  reset_sip_configuration_started: boolean = false;
  reset_sip_configuration_comlpeted: boolean = false;
  display_if_sip_attribute_running_started: boolean = false;
  display_if_sip_attribute_running_comlpeted: boolean = false;
  ngn_register_port_res;
  sip_configuration_res;
  assign_number_to_user_res;
  reset_sip_configuration_res;
  display_if_sip_attribute_running_res;
  ngn_dslam_ip_isValid: boolean = false;
  ngn_dslam_subnet_mask_isValid: boolean = false;
  ngn_card_isValid: boolean = false;
  ngn_port_isValid: boolean = false;
  ngn_phone_number_isValid: boolean = false;
  ngn_register_port_error: boolean = false;
  view_registered_number: boolean = false;
  // public pieChartLabels: string[] = [];
  // public pieChartData: number[] = [];
  // public pieChartType = 'pie';

  // keys;
  // values;
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }
  getDslamInfo(dslam_id) {
    this.dslamSrv.getDslamInfo(dslam_id).then(res => {
      this.dslamInfo = res;
    });
  }
  ///////////////////////
  show_port_count_func() {
    this.show_port_count = true;
  }

  ///////////////////////
  showToasterSuccess() {
    this.notifySrv.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
  }

  showToasterError() {
    this.notifySrv.showError("Something is wrong", "ItSolutionStuff.com")
  }

  showToasterInfo() {
    this.notifySrv.showInfo("This is info", "ItSolutionStuff.com")
  }

  showToasterWarning() {
    this.notifySrv.showWarning("This is warning", "ItSolutionStuff.com")
  }
  //////////////////////

  get_dslam_ports(page, page_size, dslam_id) {
    this.dslamPSrv.get_dslam_ports(page, page_size, dslam_id).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listDslamPorts = res.results;
    });
  }
  pageChange_srch(page) {
    this.pagination_config.currentPage = page;
    this.get_dslam_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.dslam_id);
  }

  run_command(command_obj) {
    //alert(command_obj.name)
    this.show_result = false;
    var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"0","port_number":"0"}},"command":"' + command_obj.name + '","new_lineprofile":""}';
    this.dslamSrv.run_command(command_str).then(res => {
      this.command_res = res.response.result;
      console.log(this.command_res);
      return;
      if (command_obj.name = 'profile adsl show') {
        this.profile_adsl_show = true;
        this.dslam_profiles = res.result.result;
        this.show_result = true;
      }
      else if (command_obj.name = 'lcman show') {
        this.lcman_show = true;
        this.dslam_lcman = res.result.result;
        this.show_result = true;
      }
      else if (command_obj.name = 'Show Shelf') {
        this.show_shelf = true;
        this.dslam_shelf = res.Result;
        alert(this.dslam_shelf)
        this.show_result = true;
      }
      else {
        this.dslamPort_info = res.Result;
        this.show_result = true;
      }
    });
    command_str = '';
  }
  getDslamReport(dslam_id) {
    this.dslamSrv.getDslamReport(dslam_id).then(res => {
      const jsonData = JSON.parse(res.line_profile_usage);
      this.dslam_report = res;
      let cart_profiles = new Array();
      let chart_data = new Array();

      jsonData.forEach(function (value) {
        cart_profiles.push(value.name);
        chart_data.push(value.y);
      });
      this.pieChartLabels = cart_profiles;
      this.pieChartData = chart_data;
      this.pieChartType = 'pie';
    });
  }
  getDslamBoard(dslam_id) {
    this.dslamSrv.getDslamBoard(dslam_id).then(res => {
      this.dslamBoard = res;
    },
      (error) => {
        this.show_errors(error);
      });
  }
  getTemperature(slot_id) {
    let slot = this.dslamBoard.find(item => item.card_number === slot_id);
    this.temperatures = slot.temperature;
    this.slot_obj = slot;
    console.log(this.slot_obj);
  }
  get_slot_info(slot_id) {

  }

  get_dslam_current_icmp_result(dslam_id) {
    this.dslamSrv.get_dslam_current_icmp_result(dslam_id).then(res => {
      let icmp_result;
      icmp_result = JSON.parse(res.result)[0].fields;
      this.dslam_current_icmp = icmp_result.trace_route;
      this.dslam_ping = icmp_result;
    },
      (error) => {
        this.show_errors(error);
      });
  }

  run_icmp_command() {
    this.icmp_param.dslam_id = this.dslam_id;
    this.icmp_param.icmp_type = 'traceroute';
    this.icmp_param.params;
    this.dslamSrv.run_icmp_command(this.icmp_param).then(res => {
      this.dslam_current_icmp = res.result;
    },
      (error) => {
        this.show_errors(error);
      });
  }

  run_ping_on_dslam(count, timeout) {
    this.icmp_param = new IcmpParam();
    this.icmp_param.dslam_id = this.dslam_id;
    this.icmp_param.icmp_type = 'ping';
    this.icmp_param.params.count = count;
    this.icmp_param.params.timeout = timeout;
    this.dslamSrv.run_icmp_command(this.icmp_param).then(res => {
      this.dslam_ping = res.result;
    },
      (error) => {
        this.show_errors(error);
      })
  }

  load_dslam_commands_by_email(dslam_id, ldap_email, ldap_login, type) {
    this.cmdSrv.load_dslam_commands_by_email(dslam_id, ldap_email, ldap_login, type).then(res => {
      this.commandObj = res;
    },
      (error) => {
        this.show_errors(error);
      })
  }

  load_dslam_commands_by_username(dslam_id, username, ldap_login, type){
    this.cmdSrv.load_dslam_commands_by_username(dslam_id, username, ldap_login, type).then(res => {
      this.commandObj = res;
    },
      (error) => {
        this.show_errors(error);
      })
  }

  selectEvent(item) {
    console.log(item);
    this.comm_item = item;

  }

  onChangeSearch(search: string) {
    console.log(search);

  }

  onFocused(e) {
    if(this.is_ldap_login == 'true'){
      this.load_dslam_commands_by_email(this.dslam_id,this.ldap_email,this.is_ldap_login, 'port');
    }
    else{
      this.agent_username = localStorage.getItem("username");
      this.load_dslam_commands_by_username(this.dslam_id, this.agent_username, false, 'port'); 
      }
  }

  show_errors(error) {
    this.errorHandler.handleError(error);
    if (this.errorHandler.errorMessage.includes('401')) {
      this.notifySrv.showError('Unauthorized', 'Error')
    }
    else if (this.errorHandler.errorMessage.includes('Unknown Error')) {
      this.notifySrv.showError('connect to server has been failed', 'Error')
    }
    else {
      this.notifySrv.showError(this.errorHandler.errorMessage, 'Error')
    }
  }


  get_port_count_func() {
    this.dslamPSrv.get_port_count_func().then(res => {

    });
  }

  get_last_command(dslam_id) {
    this.dslamSrv.get_last_command(dslam_id).then(res => {
      console.log(res);
      this.dslamPort_info = res[3].value.result;

      this.show_result = true;
    });
  }

  get_zabbix_history(zabbix_item_id, time_from, time_till) {
    let zabbix_history = new Zabbix_history();
    zabbix_history.zabbix_item_id = zabbix_item_id;
    zabbix_history.time_from = time_from;
    zabbix_history.time_till = time_till;
    this.bwSrv.get_zabbix_history(zabbix_history).then(res => {
      this.zabbix_histories = res.item.result;
    });
  }

  get_fifty_five_precntage() {
    this.bwSrv.get_fifty_five_precntage().then(res => {
      this.fifty_five_precntage = res
    });
  }
  load_dslam_ports(dslam_id, slot_count, port_count) {
    this.dslamSrv.load_dslam_ports(dslam_id, slot_count, port_count).then(res => {
      this.get_dslam_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.dslam_id);
    });
  }
  reload_dslam_ports() {
    this.load_dslam_ports(this.dslam_id, this.slot_count, this.port_count);
  }

  search_ports(count, type) {
    if (type == "1") {
      this.slot_count = count;
      console.log(count);
      console.log(this.S_number)
      console.log(this.P_number)
      if(this.S_number && this.P_number){
        this.dslamSrv.search_port(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.dslam_id, this.S_number, this.P_number).then(res => {
          if(res){
            this.pagination_config.totalItems = res.count;
          this.listDslamPorts = res.results;
          }
        });
      } 
    }


    if (type == "2") {
      this.port_count = count;
      console.log(count);
      console.log(this.S_number)
      console.log(this.P_number)
      if(this.S_number && this.P_number){
        this.dslamSrv.search_port(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.dslam_id, this.S_number, this.P_number).then(res => {
          if(res){
            this.pagination_config.totalItems = res.count;
          this.listDslamPorts = res.results;
          }
        });
      } 
      
    }
  }

  fiberhome_get_cards(){
    let dslam_card_str = '{"dslam_id":"'+this.dslam_id+'","params":{"type":"dslam","is_queue":false, "port_conditions":{"slot_number":0,"port_number":0}}}';
    this.dslamSrv.fiberhome_get_cards(dslam_card_str).then(res=>{

    });
  }
  
  register_ngn_number() {
    this.ngn_register_port_started = false;
    this.ngn_register_port_comlpeted = false;
    this.sip_configuration_started = false;
    this.sip_configuration_comlpeted = false;
    this.assign_number_to_user_started = false;
    this.assign_number_to_user_comlpeted = false;
    this.reset_sip_configuration_started = false;
    this.reset_sip_configuration_comlpeted = false;
    this.display_if_sip_attribute_running_started = false;
    this.display_if_sip_attribute_running_comlpeted = false;

    // let ngn_command = "ngn_register_port"

    // var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+this.ngn_card+'","port_number":"'+this.ngn_port+'"}},"command":"' + ngn_command + '","new_lineprofile":""}';
    // this.ngn_register_port_started =  true;
    // this.dslamSrv.register_ngn_number(command_str).then(res=>{
    //   this.ngn_register_port_res = res.result.result;
    //   this.ngn_register_port_comlpeted =  true;
    //    ngn_command = "sip_configuration"
    //    this.sip_configuration_started =  true;
    //    command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+this.ngn_card+'","port_number":"'+this.ngn_port+'"}},"command":"' + ngn_command + '","new_lineprofile":""}';
    //   this.dslamSrv.register_ngn_number(command_str).then(res=>{
    //     this.sip_configuration_res = res.result.result;

    //     this.sip_configuration_comlpeted =  true;
    //      ngn_command = "assign_number_to_user"
    //      this.assign_number_to_user_started =  true;
    //      command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+this.ngn_card+'","port_number":"'+this.ngn_port+'"}},"command":"' + ngn_command + '","new_lineprofile":""}';
    //     this.dslamSrv.register_ngn_number(command_str).then(res=>{
    //       this.assign_number_to_user_res = res.result.result;
    //       this.assign_number_to_user_comlpeted =  true;
    //        ngn_command = "reset_sip_configuration"
    //        this.reset_sip_configuration_started =  true;
    //        command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+this.ngn_card+'","port_number":"'+this.ngn_port+'"}},"command":"' + ngn_command + '","new_lineprofile":""}';
    //       this.dslamSrv.register_ngn_number(command_str).then(res=>{
    //         this.reset_sip_configuration_res = res.result.result;
    //         this.reset_sip_configuration_comlpeted =  true;
    //         ngn_command = "display_if_sip_attribute_running"
    //          this.display_if_sip_attribute_running_started =  true;
    //          command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"'+this.ngn_card+'","port_number":"'+this.ngn_port+'"}},"command":"' + ngn_command + '","new_lineprofile":""}';
    //         this.dslamSrv.register_ngn_number(command_str).then(res=>{
    //           this.display_if_sip_attribute_running_res = res.result;
    //           console.log(this.display_if_sip_attribute_running_res);
    //           this.display_if_sip_attribute_running_comlpeted =  true;
    //         });
    //       });
    //     });
    //   });
    // });
    let ngn_command = "assign_number_to_user"
    this.assign_number_to_user_started = true;
    var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"' + this.ngn_card + '","port_number":"' + this.ngn_port + '","ngn_phon_number":"' + this.ngn_phone_number + '","ngn_password":"' + this.ngn_Sip_password + '"}},"command":"' + ngn_command + '"}';
    this.dslamSrv.register_ngn_number(command_str).then(res => {
      this.assign_number_to_user_res = res.result.result;
      this.assign_number_to_user_comlpeted = true;
      ngn_command = "reset_sip_configuration"
      this.reset_sip_configuration_started = true;
      command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"' + this.ngn_card + '","port_number":"' + this.ngn_port + '"}},"command":"' + ngn_command + '","new_lineprofile":""}';
      this.dslamSrv.register_ngn_number(command_str).then(res => {
        this.reset_sip_configuration_res = res.result.result;
        this.reset_sip_configuration_comlpeted = true;
        ngn_command = "display_if_sip_attribute_running"
        this.display_if_sip_attribute_running_started = true;
        command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"' + this.ngn_card + '","port_number":"' + this.ngn_port + '"}},"command":"' + ngn_command + '","new_lineprofile":""}';
        this.dslamSrv.register_ngn_number(command_str).then(res => {
          this.display_if_sip_attribute_running_res = res.result;
          console.log(this.display_if_sip_attribute_running_res);
          this.display_if_sip_attribute_running_comlpeted = true;
        });
      });
    });
  }

  check_ngn_dslam_ip(ngn_dslam_ip) {
    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    if (this.ngn_dslam_ip.match(ipPattern) || this.ngn_dslam_subnet_mask.match(ipPattern)) {
      this.ngn_dslam_ip_isValid = true;
    }
    else {
      this.ngn_dslam_ip_isValid = false;
    }
  }

  check_ngn_dslam_subnet_mask(ngn_dslam_subnet_mask) {
    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    if (this.ngn_dslam_subnet_mask.match(ngn_dslam_subnet_mask)) {
      this.ngn_dslam_subnet_mask_isValid = true;
    }
    else {
      this.ngn_dslam_subnet_mask_isValid = false;
    }
  }

  view_registered_numbers() {
    var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"' + this.ngn_card + '","port_number":"' + this.ngn_port + '"}},"command":"display_sippstnuser_reg_state","new_lineprofile":""}';
    this.dslamSrv.register_ngn_number(command_str).then(res => {
      this.display_if_sip_attribute_running_res = res.result.result;
        if(res.result.result.includes(this.ngn_phone_number)){
          this.view_registered_number = true;
        }
        else{
          this.view_registered_number = false;
        }
    });
  }
  view_call_state() {
    var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslam","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":"' + this.ngn_card + '","port_number":"' + this.ngn_port + '"}},"command":"display_sippstnuser_call_state","new_lineprofile":""}';
    this.dslamSrv.register_ngn_number(command_str).then(res => {

    });
  }

  check_ngn_card(ngn_card) {

  }

  check_ngn_phone_number(ngn_phone_number) {

  }

  check_ngn_Sip_password(ngn_Sip_password) {

  }

  ngOnInit(): void {
    this.is_ldap_login = localStorage.getItem("ldap_login")
    this.agent_username = localStorage.getItem("username")?localStorage.getItem("username"):'';
    this.ldap_email = localStorage.getItem("ldap_email")?localStorage.getItem("ldap_email").toLowerCase():'';
    this.getDslamInfo(this.dslam_id);
    this.get_dslam_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.dslam_id);
    this.getDslamBoard(this.dslam_id);
    this.get_dslam_current_icmp_result(this.dslam_id);
    this.get_fifty_five_precntage();
  }
}