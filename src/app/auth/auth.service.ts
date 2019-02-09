import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { User } from './user';
import {OAuthSettings} from './oauth';
import { AlertsService } from '../alerts.service';
import { Client } from '@microsoft/microsoft-graph-client';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
public isAuth: boolean;
public user: User;
  constructor(private msalService: MsalService, private alertsService: AlertsService) {
    this.isAuth = false;
    this.user = null;

    this.isAuth = this.msalService.getUser() != null;
    this.getUser().then((user) => {this.user = user; });
  }

async signIn(): Promise<void> {
  let result = await this.msalService.loginPopup(OAuthSettings.scopes).catch((reason) => {
    this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
  });
  if (result) {
    this.isAuth = true;
    this.user = await this.getUser();
  }
}

signOut(): void {
  this.msalService.logout();
  this.user = null;
  this.isAuth = false;
}

async getAccessToken(): Promise<string> {
  let result = await this.msalService.acquireTokenSilent(OAuthSettings.scopes)
    .catch((reason) => {
      this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
    });

  // Temporary to display token in an error box
  if (result) {this.alertsService.add('Token acquired', result);
}
  return result;
}

private async getUser(): Promise<User> {
  if (!this.isAuth) {return null; }

  let graphClient = Client.init({
    authProvider: async (done) => {
        let token = await this.getAccessToken(). catch((reason) => {
            done(reason, null);
        });

        if (token) {
          done(null, token);
        } else {
          done('Could not get access token', null);
        }
    }
  });

  let gUser = await graphClient.api('/me').get();
  let user = new User();
  user.displayName = gUser.displayName;
  user.email = gUser.mail || gUser.userPrincipalName;

  return user;
}

}
