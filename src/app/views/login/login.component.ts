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
  errorMessage = '';
  @Output() send_username = new EventEmitter<String>();
  username = '';
  login(loginForm){
    let loggedin = this.usrSrv.loggedin();
    this.usrSrv.login(loginForm).then(res => {
      this.token = res.token;
      if (this.token) {
        localStorage.setItem('access_token', this.token);
        this.username = res.username;
        this.send_username.emit(this.username);
        localStorage.setItem('username', this.username);
        this.notifySrv.showSuccess('Login is Successfull','Login');
        this.router.navigate(['/dslam/dslam']);
      }
      else {
        this.router.navigate(['/login']);
      }
  },
   (error) => {
    this.show_errors(error);
  });
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

