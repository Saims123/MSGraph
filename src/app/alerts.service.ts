import { Injectable } from '@angular/core';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
alerts: Alert[] = [];
  constructor() { }

  add(_message: string, _debug: string) {
    this.alerts.push({message: _message, debug: _debug});
  }

  remove(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }


}


