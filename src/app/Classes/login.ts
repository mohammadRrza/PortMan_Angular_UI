import { Router } from '@angular/router';

export class login{
    constructor (private router: Router) {
 }
  is_login:boolean = false
  check_is_login() {
    let loggedIn = localStorage.getItem('loggedin');
    if(!Boolean(loggedIn)){
       return this.is_login = false
    }
 }
}