import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export class LoginCls{
    constructor(private jwtHelper: JwtHelperService,
        private router: Router,
        ){

    }
    check_login() {
        let loggedIn = localStorage.getItem('loggedin');
        console.log('jwtHelper:'+this.jwtHelper.isTokenExpired(localStorage.getItem('access_token')));
        console.log('not loggedIn:'+!Boolean(loggedIn))
        if(!Boolean(loggedIn) || this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'))){
          this.router.navigate(['/login']);
          console.log("token expired")
        }
        else {
          console.log("token not expired"); 
        }
      }
}