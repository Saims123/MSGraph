import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
isAuth: boolean;
user: any;
  constructor() { }

  ngOnInit() {
    this.isAuth = false;
    this.user = {};
  }

  signIn(): void {
      this.isAuth = true;
      this.user = {
        displayName: 'User',
        email: 'stevesim@hotmail.com'
      };
  }

}
