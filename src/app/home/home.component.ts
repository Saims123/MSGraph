import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
isAuth: boolean;
user: any;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  async signIn(): Promise<void> {
    await this.authService.signIn();
    if (this.authService.isAuth) {
      let token = await this.authService.getAccessToken();
    }
  }


  signOut() {
    this.authService.signOut();
  }

}
