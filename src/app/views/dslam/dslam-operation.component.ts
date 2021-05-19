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
  pagination_config: any;
  listDslamPorts = [];
  dslamInfo = {};
  dslamBoard = [];
  dslam_report;
  temperatures = [];
  dslamPort_info;
  dslam_ping;
  profile_adsl_show = false;
  lcman_show = false;
  public pieChartLabels: string[];
  public pieChartData: number[] = [21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 21, 39, 10, 14, 16, 17, 17, 12, 12, 19, 18, 15, 256, 16, 17, 17, 12, 12, 19, 18, 15, 256];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {};
  title = 'ngrx';
  showSpinner = true;
  data: any;
  dslam_profiles = []; 
  dslam_current_icmp;
  dslam_lcman;
  icmp_param: IcmpParam = new IcmpParam;
  comm_item = {};
  zabbix_item_id:number = 60282;
  zabbix_histories = [];
  fifty_five_precntage = [];
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

  /////////////
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
    this.show_result = false;
    var command_str = '{"dslam_id":"' + this.dslam_id + '","params":{"type":"dslam","dslam_id":"' + this.dslam_id + '","is_queue":false},"command":"' + command_obj.name + '"}';
    this.dslamSrv.run_command(command_str).then(res => {
      if(command_obj.name = 'profile adsl show'){
        this.profile_adsl_show = true;
        this.dslam_profiles = res.result.result;
        this.show_result = true;
      }
      else if(command_obj.name ='lcman show'){
        console.log(res.result.result);
        this.lcman_show = true;
        this.dslam_lcman = res.result.result;
        this.show_result = true;
      }
      else{
        this.dslamPort_info = res.result.result;
        this.show_result = true;
      }

    });
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
    console.log(slot);
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

  load_dslam_commands(dslam_id, type) {
    this.cmdSrv.load_dslam_commands(dslam_id, type).then(res => {
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
    console.log('onFocused');

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

  get_last_command(dslam_id) {
    this.dslamSrv.get_last_command(dslam_id).then(res => {
      console.log(res);
      this.dslamPort_info = res[3].value.result;
      this.show_result = true;
    });
  }

  get_zabbix_history(zabbix_item_id,time_from,time_till) {
    let zabbix_history = new Zabbix_history();
    zabbix_history.zabbix_item_id = zabbix_item_id;
    zabbix_history.time_from = time_from;
    zabbix_history.time_till = time_till;
    this.bwSrv.get_zabbix_history(zabbix_history).then(res => {
      this.zabbix_histories = res.item.result;
    });
  }
  
  get_fifty_five_precntage(){
    this.bwSrv.get_fifty_five_precntage().then(res => {
      this.fifty_five_precntage = res
    });
  }

  ngOnInit(): void {
    console.log('CLICK');
    let loggedIn = localStorage.getItem('loggedin');
    console.log(!Boolean(loggedIn));

    if(!Boolean(loggedIn)){
      console.log('CLICK2');

      this.router.navigate(['/login']);
    }
     this.getDslamInfo(this.dslam_id);
    this.get_dslam_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.dslam_id);
    this.getDslamBoard(this.dslam_id);
    this.get_dslam_current_icmp_result(this.dslam_id);
    this.load_dslam_commands(this.dslam_id, 'port');
    this.get_last_command(this.dslam_id);
    //this.get_zabbix_history(this.zabbix_item_id,"2020/12/01","2020/12/03");
    this.get_fifty_five_precntage();
  }
}