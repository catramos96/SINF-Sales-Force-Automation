import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {CreateAppointmentsModalPage} from "../appointments/create-appointments-modal/create-appointments-modal"
import {AppointmentsProvider} from "../../providers/appointments/appointments";
import {ViewAppointmentModalPage} from "../appointments/view-appointment-modal/view-appointment-modal";

/*
Colors of appointments in the map
 */
const colors: any = {
  priority: {
    primary: '#1522e8',
    secondary: '#7598e8'
  },
  not_priority: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
};

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulePage {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  events: CalendarEvent[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl : ModalController, private appointmentsService: AppointmentsProvider) {

    this.getAppointments();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  getAppointments(){
    var appointments:Array<any> = [];
    this.appointmentsService.getAllAppointments().subscribe(
      data => {
        console.log(data);
        appointments = data;
        this.loadAppointments(appointments);
      },
      err => {
        console.log(err);
        this.loadAppointments(appointments);
      });
  }

  loadAppointments(appointments){

    for(var i = 0 ; i < appointments.length; i++){
      var color;

      if(appointments[i].Prioridade)
        color = colors.priority;
      else
        color = colors.not_priority;

      this.events.push({
        title: appointments[i].Resumo,
        start: startOfDay(appointments[i].DataInicio),
        end: endOfDay(appointments[i].DataFim),
        meta: appointments[i].ID,
        color: color,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false
        }
      });
      this.refresh.next();
    }
  }

  createNewAppointment(){
    let modal = this.modalCtrl.create(CreateAppointmentsModalPage,{ID:""});
    modal.present()
  }

  /*
  Changes in the calendar displayment
   */
  updateWithPrevious(){
    switch (this.view){
      case "month":{

        break;
      }
      case "week":{

        break;
      }
      case "day":{

        break;
      }
    }

    //Update events
  }

  updateWithToday(){
    switch (this.view){
      case "month":{

        break;
      }
      case "week":{

        break;
      }
      case "day":{

        break;
      }
    }

    //Update events
  }

  updateWithNext(){
    switch (this.view){
      case "month":{

        break;
      }
      case "week":{

        break;
      }
      case "day":{

        break;
      }
    }

    //Update events
  }

  /*
  EVENTS
   */
  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }


  handleEvent(action: string, event: CalendarEvent): void {
    var id = event.meta;
    let modal = this.modalCtrl.create(ViewAppointmentModalPage, { ID: id });
    modal.present();
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.not_priority,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

}
