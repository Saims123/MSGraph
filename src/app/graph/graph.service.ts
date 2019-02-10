import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';
import {AlertsService} from '../alerts.service';
import {Event} from './event';
import {AuthService} from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class GraphService {
private graphClient: Client;
  constructor(
    private authService: AuthService,
    private alertService: AlertsService) {
    this.graphClient = Client.init({
        authProvider: async (done) => {
          let token = await this.authService.getAccessToken().catch((reason) => {
            done(reason, null);
          });

          if (token) {
            done(null, token);
          } else {
            done('Could not get an access token', null);
          }
        }
    });
  }

  async getEvents(): Promise<Event[]> {
    try {
      let result = await this.graphClient
      .api('/me/events')
      .select('subject,organizer,start,end')
      .get();
      return result.value;
    } catch (error) {
      this.alertService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }



}
