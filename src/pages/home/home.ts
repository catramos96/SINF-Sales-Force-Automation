import { NavController } from 'ionic-angular';
import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Input, Output, EventEmitter } from '@angular/core';
import {getDateString, getMonthName} from "../calendar-resources";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  public viewDate: Date = new Date(Date.now());
  public view: string = 'month';

  days_label: Array<string> = [
    'S', 'T', 'Q', 'Q', 'S', 'S', 'D'
  ];

  clickedDate: Date;
  events: CalendarEvent[] = [];

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor(public navCtrl: NavController) {
  }

  getCalendarTitle(){
    return getDateString(this.viewDate);
  }
}





