import { NavController } from 'ionic-angular';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Input,Output, EventEmitter } from '@angular/core';
import { getDateString } from "../calendar-resources";
import { AppointmentModal } from "../appointments/appointmentModal";
import { ModalController} from 'ionic-angular';
import { OpportunitiesPage } from '../opportunities/opportunities';
import { OpportunitiesProvider } from '../../providers/opportunities/opportunities';
import { OpportunityModalPage } from '../opportunities/opportunity-modal/opportunity-modal';
import {AppointmentsProvider} from "../../providers/appointments/appointments";
import {RoutesProvider} from "../../providers/routes/routes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  opportunities:Array<any>= [];
  appointments:Array<any> = [];
  routes:Array<any> = [];
  leads:Array<any> = [];


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
    private opportunitiesService: OpportunitiesProvider,
    private  appointmentsService: AppointmentsProvider,
    private routesService: RoutesProvider
  ) {

  }

  ionViewDidLoad() {
    this.getAppointments();
    this.getOpportunities();
    this.getRoutes();
    this.getLeads();
  }

  goToOpportunities() {
    this.navCtrl.push(OpportunitiesPage);
  }

  /**
   * GET INFO
   */

  getAppointments(){
    this.appointmentsService.getAllAppointments().subscribe(
      data => {
        console.log(data);
        this.appointments = data;
        this.loadAppointments();
      },
      err => {
        console.log(err);
        this.loadAppointments();
      });
  }

  getLeads(){
    this.opportunitiesService.getOpportunities().subscribe(
      data => {
        console.log(data);
        this.leads = data;
        this.loadLeads();
      },
      err => {
        console.log(err);
        this.loadLeads();
      });
  }

  getRoutes(){
    this.routesService.getAllRoutes().subscribe(
      data => {
        console.log(data);
        this.routes = data;
        this.loadRoutes();
      },
      err => {
        console.log(err);
        this.loadRoutes();
      });
  }

  getOpportunities(){
    this.opportunitiesService.getOpportunities().subscribe(
      data => {
        console.log(data);
        this.opportunities = data;
        this.loadOpportunities();
      },
      err => {
        console.log(err);
        this.loadOpportunities();
      });
  }

  /**
  TABLES INFO
   */

  loadAppointments(){

    var height = document.getElementById("main-content").children.item(2).clientHeight;
    var table = document.getElementById("AppointmentsTable");
    var body = table.getElementsByTagName("tbody").item(0);

    while(body.firstChild){
      body.removeChild(body.firstChild);
    }

    for(var i = 0; i < this.appointments.length; i++){
      var e:HTMLElement = document.createElement('tr');

      e.innerHTML = '<td>' + this.appointments[i].DataInicio.toString() + '</td>' +
        '<td>' + this.appointments[i].Resumo + '</td>';

      e.addEventListener("click",() =>{
        let modal = this.modalCtrl.create(AppointmentModal);//,{ productID: productID });
        modal.present();
      });

      body.insertAdjacentElement("beforeend",e);
    }

    this.tablesConfig(table,height,body);
  }

  loadRoutes(){

    var height = document.getElementById("main-content").children.item(2).clientHeight;
    var table = document.getElementById("RoutesTable");
    var body = table.getElementsByTagName("tbody").item(0);

    while(body.firstChild){
      body.removeChild(body.firstChild);
    }

    for(var i = 0; i < this.routes.length; i++){

      var e:HTMLElement = document.createElement('tr');

      e.innerHTML = '<td>' + this.routes[i].Rota + '</td>';

      e.addEventListener("click",() =>{
        /*let modal = this.modalCtrl.create(AppointmentModal);//,{ productID: productID });
        modal.present();*/
      });

      body.insertAdjacentElement("beforeend",e);
    }

    this.tablesConfig(table,height,body);
  }

  loadOpportunities(){

    var height = document.getElementById("main-content").children.item(2).clientHeight;
    var table = document.getElementById("OpportunitiesTable");
    var body = table.getElementsByTagName("tbody").item(0);

    while(body.firstChild){
      body.removeChild(body.firstChild);
    }

    for(var i = 0; i < this.opportunities.length; i++){

      var e:HTMLElement = document.createElement('tr');
      var id = this.opportunities[i].Lead.ID;

      e.innerHTML = '<td>' + this.opportunities[i].Lead.Descricao + '</td>';

      e.addEventListener("click",() =>{
        let modal = this.modalCtrl.create(OpportunityModalPage,{opportunityID: id });
        modal.present();
      });

      body.insertAdjacentElement("beforeend",e);
    }

    this.tablesConfig(table,height,body);
  }

  loadLeads(){

    var height = document.getElementById("main-content").children.item(2).clientHeight;
    var table = document.getElementById("LeadsTable");
    var body = table.getElementsByTagName("tbody").item(0);

    while(body.firstChild){
      body.removeChild(body.firstChild);
    }

    for(var i = 0; i < this.leads.length; i++){

       var e:HTMLElement = document.createElement('tr');
      var id = this.leads[i].Lead.ID;

      e.innerHTML = '<td>' + this.leads[i].Lead.Descricao + '</td>';

      e.addEventListener("click",() =>{
        let modal = this.modalCtrl.create(OpportunityModalPage,{opportunityID: id });
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

    while (body.scrollHeight + header.clientHeight > maxHeight + maxHeight*1/7
          && table.children.length > 0) {
      body.deleteRow(table.children.length - 1);
    }
  }

  getCalendarTitle(){
    return getDateString(this.viewDate);
  }
}





