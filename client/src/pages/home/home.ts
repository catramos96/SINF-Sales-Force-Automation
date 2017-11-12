import { NavController } from 'ionic-angular';
import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import {Input,Output, EventEmitter } from '@angular/core';
import {getDateString} from "../calendar-resources";
import {window} from "rxjs/operator/window";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  public viewDate: Date = new Date(Date.now());
  public view: string = 'month';
  days_label: Array<string> = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  events: CalendarEvent[] = [];
  @Input() locale: string = 'en';
  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  ngAfterViewInit() {
    this.loadAppointments(new Date(Date.now()));
  }

  /**
  TABLES INFO
   */

  loadAppointments(date:Date){

    //TODO: ir buscar os elementos da data com paginação
    //TEMP
    var appointments = [{time:"10:00",description:"Meeting with Mr.Smith"},
      {time:"12:00",description:"Team Discussion about project X"},
      {time:"12:00",description:"Team Discussion about project X"},
      {time:"12:00",description:"Team Discussion about project X"}];


    var height = document.getElementById("main-content").children.item(2).clientHeight;
    var table = document.getElementById("AppointmentsTable");
    var body = table.getElementsByTagName("tbody").item(0);


    for(var i = 0; i < appointments.length; i++){

      var e:HTMLElement = document.createElement('tr');

      e.innerHTML = '<td>' + appointments[i].time + '</td>' +
        '<td>' + appointments[i].description + '</td>';

      e.addEventListener("click",() =>{this.showAppointmentDetails();});

      body.insertAdjacentElement("beforeend",e);
    }

    this.tablesConfig(table,height,body);
  }


  /**
  DETAILS
   */

  showAppointmentDetails(){ //id como parametro

    var description = "Board Discussion about the financial problems in the company";
    var hours = "10:00 - 12:00";
    var address = "Avenue of France, number 252. 4400-400";
    var tags = ["Meeting","Opportunity"];
    var group = "Enterprise x";
    var client = "Client x";
    var previousAppointment = getDateString(new Date(Date.now()));

    var html:string = '<table class="table table-bordered table-responsive">' +
                  '<thead>' +
                    '<tr>' +
                      '<th class="table-1-column">Appointment</th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                    '<tr>' +
                      '<td>' + description + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>' + hours + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>' + address + '</td>' +
                    '</tr>';

    if(tags.length > 0){
      html += "<tr><td>";
      for(var i = 0; i < tags.length; i++){
        html +='<a class="tag">' + tags[i] + '<a>';    //Por com href para redirecionar
      }
      html += "</td></tr>";
    }

    html +=       '</tbody>' +
                  '<thead>' +
                  '<tr>' +
                  '<th class="table-1-column">Targets</th>' +
                  '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                  '<tr>' +
                  '<td><a>' + group + '</a></td>' +
                  '</tr>' +
                  '<tr>' +
                  '<td><a>' + client + '</a></td>' +
                  '</tr>' +
                  '</tbody>' +
                  '<thead>' +
                  '<tr>' +
                  '<th class="table-1-column">Previous Appointment</th>' +
                  '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                  '<tr>' +
                  '<td><a>' + previousAppointment + '</a></td>' +
                  '</tr>' +
                  '</tbody>' +
                '</table>';

    this.showDetails(html);
  }

  showRouteDetails(id){
    //TODO

    return;
  }

  showLeadDetails(id){
    //TODO

    return;
  }

  showOpportunityDetails(id){
   //TODO

    return;
  }

  showDetails(html){
    var details:HTMLElement = document.getElementById("Details");

    while(details.children.length != 0)
      details.children.item(0).remove();

    details.insertAdjacentHTML("beforeend", html);
    document.getElementById("DetailsSettings").style.setProperty("display","inline-block");
  }

  tablesConfig(table,maxHeight,body) {

    var html: string;
    var header = table.getElementsByTagName("thead").item(0);

    while (body.scrollHeight + header.clientHeight < maxHeight + maxHeight*1/6) {
      html = '<tr>' +
        '<td style="color: transparent">X</td>' +
        '<td style="color: transparent">X</td>' +
        '</tr>';
      body.insertAdjacentHTML("beforeend", html);
    }

    while (body.scrollHeight + header.clientHeight > maxHeight + maxHeight*1/6
          && table.children.length > 0) {
      body.deleteRow(table.children.length - 1);
    }
  }

  getCalendarTitle(){
    return getDateString(this.viewDate);
  }
}





