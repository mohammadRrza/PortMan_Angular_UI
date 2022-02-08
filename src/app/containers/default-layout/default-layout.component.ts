import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  constructor(private router: Router) {
    console.log(this.username);

  }

  public sidebarMinimized = false;
  public navItems = navItems;
  username: string;
  attributes: boolean = false;
  logout() {
    localStorage.removeItem('loggedin');
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('ldap_login');
    localStorage.removeItem('username');

    this.router.navigate(['/login']);

  }
  getUsername($event) {
    this.username = $event;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
    }
    else {
      this.router.navigate(['/login']);
    }
    var is_ldap_login = localStorage.getItem("ldap_login")
    if(is_ldap_login === 'true'){
      var ldap_permissions = JSON.parse(localStorage.getItem("ldap_permissions"));
      this.navItems.forEach(function (value) {
        if (value.ldap_attributes && value.ldap_attributes.who) {
          for (var i = 0; i < ldap_permissions.length; i++) {

            if(value.ldap_attributes.who.includes(ldap_permissions[i])){
              value.attributes.hidden = null;
              break;
            }
            else{
              if(value.attributes){      
                value.attributes.hidden = true;
              }
            }
          }

        }
  
  
      });
       this.username = localStorage.getItem("username");
       console.log(this.username); 
    }
    else{
      var permissions = JSON.parse(localStorage.getItem("permissions"));
      var role = permissions.user_type;
      this.navItems.forEach(function (value) {
        if (value.attributes && value.attributes.who) {
          if(value.attributes.who.includes(role)){
            value.attributes.hidden = null;
          }
          else{
            value.attributes.hidden = true;
          }
        }
  
  
      });
       this.username = localStorage.getItem("username");
       console.log(this.username);
    }


  }


}
