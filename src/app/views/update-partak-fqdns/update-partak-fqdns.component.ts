import { Component, OnInit } from '@angular/core';
import { PartakService} from '../../../services/partak.service';

@Component({
  selector: 'app-update-partak-fqdns',
  templateUrl: './update-partak-fqdns.component.html',
  styleUrls: ['./update-partak-fqdns.component.css']
})
export class UpdatePartakFqdnsComponent implements OnInit {

  constructor(private partatSrv:PartakService) { }
  prov_list = [];
  prov_id: number;
  prov_keyword = 'ProvinceName';
  city_list = [];
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

  search_fqdns(event){
    this.partatSrv.search_fqdns(event.query).then(res=>{
      this.portman_fqdns = res.portman_fqdn;
    });
  }
  ngOnInit(): void {
  }

}
