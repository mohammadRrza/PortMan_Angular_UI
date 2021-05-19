import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DslamService } from '../../../services/dslam.service';
import { DslamPortService } from '../../../services/dslam-port.service';
import { BandwidthService } from '../../../services/bandwidth.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
  constructor(private dslamsrv:DslamService,
    private dslamportsrv:DslamPortService,
    private bandwidthsrv:BandwidthService)
    {
      this.pagination_config_p = { 
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
      };
      this.pagination_config_d = { 
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0
      };
      
  }
  date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  time = new Date().toString().split(' ')[4];
  count = 10;
  pagination_config_p;
  pagination_config_d;
  list_dslam_events = [];
  list_dslamport_events = [];
  dslam_icmp_snapshotCount;
  loss_precent = [];
  loss_count = [];
  loss_data;
  interface_traffic_input;
  traffic_input_data;
  traffic_input_data_last_arr = [1.4];
  traffic_input_time_arr = ['10:02'];
  traffic_input_data_prev_arr = [1.25];


  get_dslam_icmp_snapshotCount(date,count){
    this.dslamsrv.get_dslam_icmp_snapshotCount(date,count).then(res =>{
      this.dslam_icmp_snapshotCount = res.pck_loss;
      this.dslam_icmp_snapshotCount.forEach(element => {
        this.loss_precent.push(element[0]);
        this.loss_count.push(element[1]);
      });
      this.loss_data = {
        labels: this.loss_precent,
        datasets: [
            {
                data: this.loss_count,
                backgroundColor: [
                    "#FF6384",
                    "#36C2EB",
                    "#55A2EB",
                    "#88B2EB",
                    "#7A0A9E"
                ],
                hoverBackgroundColor: [
                  "#FF6314",
                  "#36A2FA",
                  "#55C5EB",
                  "#59FFEB",
                  "#09EDAF"
                ]
            }]    
        };
   });
  }

  get_dslam_event(page,page_size,sort_field){
    this.dslamsrv.get_dslam_event(page,page_size,sort_field).then(res =>{
       this.list_dslam_events = res.results;
       this.pagination_config_d.totalItems = res.count;

    });
   
  }

  get_interface_traffic_input(){
    this.bandwidthsrv.get_interface_traffic_input().then(res =>{
      this.interface_traffic_input = res;
      this.traffic_input_data_last_arr.push(this.interface_traffic_input.lastvalue);
      this.traffic_input_data_prev_arr.push(this.interface_traffic_input.prevvalue);
      this.traffic_input_time_arr.push(this.time);
      this.traffic_input_data = {
        labels:  this.traffic_input_time_arr,
        datasets: [
            {
                label: 'Last Value',
                data:this.traffic_input_data_last_arr,
                fill: true,
                borderColor: '#4bc0c0'
            },
            {
                label: 'Previous Value',
                data: this.traffic_input_data_prev_arr,
                fill: true,
                borderColor: '#565656'
            }
        ],
    }
   });
  }

  get_dslamport_event(page,page_size,sort_field){
    this.dslamportsrv.get_dslamport_event(page,page_size,sort_field).then(res =>{
       this.list_dslamport_events = res.results;
       this.pagination_config_p.totalItems = res.count;
    });
  }

  get_live_chart(){
    this.bandwidthsrv.get_live_traffic_input().then(res=>{
      
    });
  }

  paginate_d(event){
    this.pagination_config_d.currentPage = event.page + 1;
    this.pagination_config_d.itemsPerPage = event.rows;
    this.get_dslam_event(this.pagination_config_d.currentPage, this.pagination_config_d.itemsPerPage,'created_at');
  }

  paginate_p(event){
    this.pagination_config_p.currentPage = event.page + 1;
    this.pagination_config_p.itemsPerPage = event.rows;
    this.get_dslamport_event(this.pagination_config_p.currentPage, this.pagination_config_p.itemsPerPage,'created_at');
  }

  ngOnInit(): void {
    this.get_interface_traffic_input();
    this.get_dslam_icmp_snapshotCount(this.date,this.count);
    this.get_dslam_event(this.pagination_config_d.currentPage, this.pagination_config_d.itemsPerPage,'created_at');
    this.get_dslamport_event(this.pagination_config_p.currentPage, this.pagination_config_p.itemsPerPage,'created_at');

  }

}