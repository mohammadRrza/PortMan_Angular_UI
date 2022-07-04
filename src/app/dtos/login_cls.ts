import { Router } from '@angular/router';

export class LoginCls{
    constructor(
        private _router: Router,
        ){

    }
  check_login(err){
    if(err.status === 401){
      this._router.navigate(['/login']);
    }
    else{
      console.log("error not found")
    }
  }
}