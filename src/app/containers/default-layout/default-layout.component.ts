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
