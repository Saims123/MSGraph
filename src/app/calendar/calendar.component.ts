import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import {Event, DateTimeTimeZone} from '../graph/event';
import {GraphService} from '../graph/graph.service';
import { GraphRequest } from '@microsoft/microsoft-graph-client';
import { AlertsService } from '../alerts.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
public events: Event[];
  constructor(
    private graphService: GraphService,
    private alertService: AlertsService
  ) { }

  ngOnInit() {
    this.graphService.getEvents()
      .then((event) => {
        this.events = event;
        this.alertService.add('Events from Graph', JSON.stringify(event, null, 2));
        console.log(event);
      });
  }

  formatTimeZone(dateTime: DateTimeTimeZone): string {
    try {
      return moment.tx(dateTime.dateTime, dateTime.timeZone).format();
    } catch (error) {
      this.alertService.add('DateTimeTimeZoze conversion error', JSON.stringify(error, null, 2));
    }
  }
}
