import { Component, OnInit } from '@angular/core';
import { DslamPortService } from '../../../services/dslam-port.service';

@Component({
  selector: 'app-dslam-port',
  templateUrl: './dslam-port.component.html',
  styleUrls: ['./dslam-port.component.css']
})
export class DslamPortComponent implements OnInit {

  constructor(private dsportSrv:DslamPortService ) {
    this.pagination_config = { 
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
   }
  listDslamPotrs=[];
  pagination_config: any;
  Provinces = [];
  progressSpinner: boolean = false;
  displayMaximizable: boolean = false;
  portobj={};

  paginate(event){
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_all_dslam_ports(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }
  get_all_dslam_ports(page,itemsPerPage){
    this.progressSpinner = true;
    this.dsportSrv.get_all_dslam_ports(page,itemsPerPage).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listDslamPotrs = res.results;
      this.progressSpinner = false;
  });
  }

  show_dslam_port_info(port_id){
    this.displayMaximizable = true;
    this.portobj = this.listDslamPotrs.find(x => x.id === port_id);
  }
  get_dslam_port_info(){
    
  }
  ngOnInit(): void {
    this.get_all_dslam_ports(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
  }

}
