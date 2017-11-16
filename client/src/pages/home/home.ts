import { NavController } from 'ionic-angular';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Input,Output, EventEmitter } from '@angular/core';
import { getDateString } from "../calendar-resources";
import { window } from "rxjs/operator/window";
import { AppointmentModal } from "../appointments/appointmentModal";
import { ModalController} from 'ionic-angular';
import { OpportunitiesPage } from '../opportunities/opportunities';
import { OpportunitiesProvider } from '../../providers/opportunities/opportunities';
import { OpportunityModalPage } from '../opportunities/opportunity-modal/opportunity-modal';
import { IonicApp } from 'ionic-angular/components/app/app-root';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  opportunities: [
    {
      Lead:{
        ID : "1",
        Descricao : "Encomenda de coisas",
      }
    },
    {
      Lead:{
        ID : "1",
        Descricao : "Encomenda de coisas",
      }
    }
  ];

  public viewDate: Date = new Date(Date.now());
  public view: string = 'month';
  days_label: Array<string> = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  events: CalendarEvent[] = [];
  @Input() locale: string = 'en';
  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    public modalCtrl : ModalController,
    private opportunitiesService: OpportunitiesProvider
  ) {

  }

  ionViewDidLoad() {
    this.getOpportunities();
    this.loadAppointments(new Date(Date.now()));
  }
  /*
  ngAfterViewInit() {
    this.getOpportunities();
    this.loadAppointments(new Date(Date.now()));
  }*/

  getOpportunities(){
    /*
    this.opportunitiesService.getOpportunities().subscribe(
      data => { 
        this.opportunities = data;
      },
      err => {
          console.log(err);
      });
    */        
  }

  goToOpportunities() {
    this.navCtrl.push(OpportunitiesPage);
  }

  openModal(oppID) {
    let modal = this.modalCtrl.create(OpportunityModalPage,{ opportunityID: oppID });
    modal.present();
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

      e.addEventListener("click",() =>{
        let modal = this.modalCtrl.create(AppointmentModal);//,{ productID: productID });
        modal.present();
      });

      body.insertAdjacentElement("beforeend",e);
    }

    this.tablesConfig(table,height,body);
  }


  /**
  DETAILS
   */

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





