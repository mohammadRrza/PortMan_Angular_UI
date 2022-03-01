import {Component ,OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service'
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit{ 
  constructor(private router: Router, 
              private usrSrv:UserService,
              private fb: FormBuilder,
              private notifySrv : NotificationService,
              private errorHandler: ErrorHandlerService
              ) { }
  loginForm: FormGroup;
  isSubmitted  =  false;
  token = '';
  ldap_token = '';
  errorMessage = '';
  @Output() send_username = new EventEmitter<String>();
  username = '';
  permission;
  role: string = "";
  show_reset_password:boolean = false;
  ldap_form:boolean = true;
  ldap_obj;
  email: string;
  show_ldap_login_form(){
    this.ldap_form = true;
  }

  show_standard_login_form(){
    this.ldap_form = false;

  }
  standard_login(loginForm){
    let loggedin = this.usrSrv.loggedin();
    this.usrSrv.login(loginForm).then(res => {
      this.token = res.token;
      if (this.token) {

        localStorage.setItem('access_token', this.token);
        this.username = res.username;
        localStorage.setItem('ldap_login', 'false');
        this.send_username.emit(this.username);
        localStorage.setItem('username', this.username);
        this.notifySrv.showSuccess('Login is Successfull','Login');
        this.role = localStorage.getItem('role')
        this.get_permission();
      }
      else {
        this.router.navigate(['/login']);
      }
  },
   (error) => {
    this.show_errors(error);
  });
  }

ldap_login(ldap_loginForm){
    this.usrSrv.ldap_login(ldap_loginForm).then(res => {
      this.ldap_obj = res.result;
      this.ldap_token = res.token;
      if(this.ldap_obj.message ==='Success'){
        var portman_ldap_groups = [];
        for (var i = 0; i < res.result.group_name.length; i++) {

          if(res.result.group_name[i].includes('Portman')){
            var group_name = JSON.stringify(res.result.group_name);
            var email = res.result.email;
            var ldap_name = res.result.fullname;
            localStorage.setItem('ldap_permissions', group_name);
            localStorage.setItem('ldap_email', email);
            localStorage.setItem('username', ldap_name);
            portman_ldap_groups.push(res.result.group_name[i]);
            // if(!res.result.group_name[0].includes('Portman')){
            //   this.notifySrv.showError('You are not allowed to login.No LDAP groups defined for you.','Login');
            //   return;
            // }
            
            localStorage.setItem('ldap_login', 'true');
            localStorage.setItem('access_token', this.ldap_token);
            this.notifySrv.showSuccess('Login is Successfull','Login');
            this.router.navigate(['/portman-cdms/portman-cdms']);
          }
          // else{
          //     this.notifySrv.showError('You are not allowed to login.No LDAP groups defined for you.','Login');
          //     return;
          // }

      }
      console.log(portman_ldap_groups);

      if(portman_ldap_groups.length === 0){
        this.notifySrv.showError('You are not allowed to login.No LDAP groups defined for you.','Login');
        return;
 }

      }
  },
   (error) => {
    this.show_errors(error);
  });
  }
  send_reset_password_link(email)
  {
    var valid_email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if (valid_email_regex.test(email)){
      this.usrSrv.send_reset_password_link(email).then(res=>{
        
      });
    }
    else{
      console.log('No')
    }
  }

  show_reset_password_func(){
    this.show_reset_password = true;
  }

  show_errors(error){
    this.errorHandler.handleError(error);
    if(this.errorHandler.errorMessage.includes('401')){
      this.notifySrv.showError('Unauthorized','Error')
    }
    else if(this.errorHandler.errorMessage.includes('Unknown Error')){
      this.notifySrv.showError('connect to server has been failed','Error')
    }
    else{
      this.notifySrv.showError(this.errorHandler.errorMessage,'Error')
    }
  }

  get_permission(){
    if(this.ldap_form){
      this.usrSrv.get_permission().then(ldap_perm_res => {

      });
    }
    this.usrSrv.get_permission().then(perm_res => {
      this.permission = perm_res;
      localStorage.setItem("permissions", JSON.stringify(this.permission));
      this.role = this.permission.user_type;
      localStorage.setItem('role', this.role);
      if(this.role == "COREUSER"){
        this.router.navigate(['/switch/switch']);
      }
      else if(this.role == "RESELLER"){
        this.router.navigate(['/ddr-page/ddr-page-info']);
      }
      else if(this.role == "SUPPORT" || this.role == "DIRECTRESELLER"){
        this.router.navigate(['/portman-cdms/portman-cdms']);
      }
      else{
        this.router.navigate(['/switch/switch']);
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/login']);
    }
    this.loginForm  =  this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
}
}

