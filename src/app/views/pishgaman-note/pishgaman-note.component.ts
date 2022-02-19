import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {PishgamanNoteService} from '../../../services/pishgaman_note.service';
import { DomSanitizer} from '@angular/platform-browser';
import * as moment from 'jalali-moment';
import {LoginCls} from '../../dtos/login_cls';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Pipe({name: 'safeHtml'})
export class Safe {
  constructor(private sanitizer:DomSanitizer,
    private jwtHelper: JwtHelperService){}

  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
    // return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}

@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let MomentDate = moment(value, 'YYYY/MM/DD hh:mm:ss');
    return MomentDate.locale('fa').format('YYYY/M/D hh:mm:ss');
  }
}

@Component({
  selector: 'app-pishgaman-note',
  templateUrl: './pishgaman-note.component.html',
  styleUrls: ['./pishgaman-note.component.css']
})
export class PishgamanNoteComponent implements OnInit {

  constructor(private pish_noteSrv: PishgamanNoteService,
    private sanitizer: DomSanitizer,
    private jwtHelper: JwtHelperService,
    private router: Router,

    ) {
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
   }

   pagination_config;
   pishgaman_notes = [];
   display_add_new_problem: boolean = false;
   username:string = '';
   problem_description:string = '';
   province:string = '';
   city:string = '';
   telecom_center:string = '';
   show_problems: boolean = true;
  get_pishgaman_notes(){
    this.pish_noteSrv.get_pishgaman_notes(this.pagination_config.currentPage, this.pagination_config.itemsPerPage).then(res=>{
      this.pishgaman_notes = res.results;
      this.show_problems = true;
    });
  }

  show_status_info(status_id){

  }

  edit_status(status_id){

  }

  show_add_new_problem(){
    this.display_add_new_problem =true;
  }

  onTextChange(value){
    console.log(value);
  }

  save_note(){
    var problem_description = this.problem_description.replace('"',"'").replace('"',"'");
    console.log(problem_description);
    this.username = localStorage.getItem("username");
    var note_str='{"username": "'+this.username+'","problem_description": "'+problem_description+'","province": "'+this.province+'","city": "'+this.city+'","telecom_center": "'+this.telecom_center+'"}';
    this.pish_noteSrv.save_note(note_str).then(res=>{
      this.get_pishgaman_notes();
    });

  }

  refresh_problems(){
    this.show_problems = false;
    this.get_pishgaman_notes();
  }

  ngOnInit(): void {
    // var loginCls =  new LoginCls(this.jwtHelper,this.router);
    // loginCls.check_login();
    this.get_pishgaman_notes();
  }

}
