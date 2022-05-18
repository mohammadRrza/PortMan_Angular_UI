import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {PishgamanNoteService} from '../../../services/pishgaman_note.service';
import { DomSanitizer} from '@angular/platform-browser';
import * as moment from 'jalali-moment';
import {LoginCls} from '../../dtos/login_cls';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {Subscription, timer} from 'rxjs';  
import { map, catchError } from 'rxjs/operators';

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
   ldap_permissions:any;
   timerSubscription: Subscription; 
   pagination_config;
   pishgaman_notes = [];
   display_add_new_problem: boolean = false;
   display_edit_problem: boolean = false;

   username:string = '';
   problem_description:string = '';
   province:string = '';
   city:string = '';
   telecom_center:string = '';
   show_problems: boolean = true;
   view_notes_edit:boolean = false;
   edited_problem_description:string = '';
  get_pishgaman_notes(){
    this.pish_noteSrv.get_pishgaman_notes(this.pagination_config.currentPage, this.pagination_config.itemsPerPage).then(res=>{
      this.pishgaman_notes = res.results;
      this.pagination_config.totalItems = res.count;
      this.show_problems = true;
    });
  }

  paginate(event){
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_pishgaman_notes();  
  }

  show_status_info(status_id){
    this.pish_noteSrv.get_note_by_id(status_id).then(res=>{

    });
  }

  edit_status(status_id){
    this.display_edit_problem = true;
    this.show_status_info(status_id);
  }

  apply_edit_note(){
    var problem_description = this.problem_description.replace('"',"'").replace('"',"'");
    console.log(problem_description);
    this.username = localStorage.getItem("username");
    var note_str='{"username": "'+this.username+'","problem_description": "'+problem_description+'","province": "'+this.province+'","city": "'+this.city+'","telecom_center": "'+this.telecom_center+'"}';
    this.pish_noteSrv.apply_edit_note(note_str).then(res=>{});
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
      this.ldap_permissions = localStorage.getItem('ldap_permissions');
      console.log( this.ldap_permissions);
      if( this.ldap_permissions.includes('Network-Core') || this.ldap_permissions.includes('Network-Access')){
        this.view_notes_edit = true;
      }
      else{
        this.view_notes_edit = false;
      }
      console.log(this.view_notes_edit);

      this.timerSubscription = timer(0, 10000).pipe( 
        map(() => { 
          this.refresh_problems();
        }) 
      ).subscribe(); 
    this.get_pishgaman_notes();
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

}
