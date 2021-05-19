import { Component, OnInit } from '@angular/core';
import { TelecomCenterService } from '../../../services/telecom-center.service';
import { CityService } from '../../../services/city.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-telecom-center',
  templateUrl: './telecom-center.component.html',
  styleUrls: ['./telecom-center.component.css']
})
export class TelecomCenterComponent implements OnInit {

  constructor(private telcomSrv:TelecomCenterService,
              private citySrv:CityService,
              fb: FormBuilder

    ) { 
    this.pagination_config = { 
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
    this.form = fb.group({
      "telecom_name": this.f_telecom_name,
      "telecom_prefix":this.f_telecom_prefix,
      "province":this.f_province,
      "city":this.f_city,
      "telecom_lat":this.f_telecom_lat,
      "snmp_timeout":this.f_telecom_long
    });
  }
  form: FormGroup;
  f_telecom_name = new FormControl("", Validators.required);
  f_telecom_prefix = new FormControl("", Validators.required);
  f_province = new FormControl("", Validators.required);
  f_city = new FormControl("", Validators.required);
  f_telecom_lat = new FormControl("", Validators.required);
  f_telecom_long = new FormControl("", Validators.required);

  pagination_config: any;
  listtelecoms = [];
  names = [];
  keyword = 'name';
  prefix_names = [];
  keyword2 = 'prefix_bukht_name';
  cities = new Array;
  dddd = new Array;
  keyword3 = 'text';
  telecom_info;
  search_str = '';
   s = '';
   p = '';
   displayMaximizable;
  pageChange_srch(page){
    this.pagination_config.currentPage = page;
    this.getAllTelecomCenters(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
  }
  
  show_add_telecom_center() {
    this.displayMaximizable = true;
  }
  show_telecom_info(){
    this.displayMaximizable = true;
  }

  paginate(event) {
    if (this.telecom_info == '') {
      this.pagination_config.currentPage = event.page + 1;
      this.pagination_config.itemsPerPage = event.rows;
      this.getAllTelecomCenters(this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
    }
    else {
      this.pagination_config.currentPage = event.page + 1;
      this.pagination_config.itemsPerPage = event.rows;
      //this.search_telecoms(this.pagination_config.currentPage, this.pagination_config.itemsPerPage, this.search_str)
    }

  }

  getAllTelecomCenters(page,itemsPerPage){
    this.telcomSrv.getAllTelecomCenters(page,itemsPerPage).then(res => {
      this.listtelecoms = res.results;
      this.pagination_config.totalItems = res.count;
  });
  }

  tel_name_onFocused(e){
    this.telcomSrv.getAllTelecomCenters(1,10).then(res => {
      if(res.results){
        this.names = res.results;
      }
  });
  }
  
  tel_name_onChangeSearch(search_name,txt){
    console.log(search_name);
    this.getTelecomCenterByName(1,10,search_name);
  }

  get_telecom_info(search_name,txt_id){
    //this.dddd = [];
    //this.dddd.push(search_name);
    //this.dddd.push(search_name.id);
    //console.log(this.dddd);

    switch(txt_id) { 
      case 1: { 
        this.search_str = '?page=1&page_size=10&search_city_id=&search_name='+search_name;
         this.s = search_name;
         console.log(txt_id);
         break; 

      } 
      case 2: { 
         //statements; 
         this.search_str = '?page=1&page_size=10&search_city_id='+search_name.id+'&search_name='+this.s;
         this.s = search_name.name;
         console.log(txt_id);
         break; 

        } 
      case 3: { 
        console.log(search_name);
        this.search_str = '?page=1&page_size=10&search_city_id='+search_name+'&search_name='+this.s;
        this.s = search_name.name;
        break; 

      } 
      default: { 
         //statements; 
         break; 
      } 
   }     
   //this.search_str = 'telecom-center/?page=1&page_size=10&search_city_id='+search_name.id+'&search_name='+search_name.name+'&search_prefix_bukht_name=';
    console.log(this.search_str);
   this.telcomSrv.getTelecomCenterByString(this.search_str).then(res => {
      if(res.results){
        this.listtelecoms = res.results;
        this.pagination_config.totalItems = res.count;     
       }
  });  
}

tel_name_closed(){


}
  prefix_onFocused(e){
    this.telcomSrv.getAllTelecomCenters(1,10).then(res => {
        this.prefix_names = res.results;
      
  });
  }
  prefix_onChangeSearch(e){

  }
  
  prefix_onselected(e,sss){
console.log(sss);
  }
  city_onFocused(e){
    this.citySrv.get_cities(1,10).then(res => {
      this.cities = res.results;
});
  }

  city_onChangeSearch(city_name){
    this.citySrv.get_city_byName(1,10,city_name).then(res => {
      this.cities = res.results;
});
  }

  search_telecom(){

  }

  getTelecomCenterByName(page,itemsPerPage,search_name){
    this.telcomSrv.getTelecomCenterByName(page,itemsPerPage,search_name).then(res => {
      if(res.results){
        this.names = res.results;
      }
  });
  }
  ngOnInit(): void {
     this.getAllTelecomCenters(this.pagination_config.currentPage,this.pagination_config.itemsPerPage);
  }

}
