import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  showNav: boolean;
  isAuth: boolean;
  user: any;
  constructor() { }

  ngOnInit() {
    this.showNav = false;
    this.isAuth = false;
    this.user = {};
  }

  toggleNavBar(): void {
    this.showNav = !this.showNav;
  }

  signIn(): void {
    this.isAuth = true;
    this.user = {
      displayName : 'User',
      email: 'stevesim@hotmail.com'
    };
  }

  signOut(): void {
    this.isAuth = false;
    this.user = {};
  }

}
