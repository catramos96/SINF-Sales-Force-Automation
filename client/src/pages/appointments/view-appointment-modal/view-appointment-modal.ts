import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AppointmentsProvider} from "../../../providers/appointments/appointments";
import {OpportunityDetailsPage} from "../../opportunities/opportunity-details/opportunity-details";
import {OpportunitiesProvider} from "../../../providers/opportunities/opportunities";
import {CreateAppointmentsModalPage} from "../create-appointments-modal/create-appointments-modal";
import {ContactsProvider} from "../../../providers/contacts/contacts";

@IonicPage()
@Component({
  selector: 'page-view-appointment-modal',
  templateUrl: 'view-appointment-modal.html',
})
export class ViewAppointmentModalPage {

  public priority:boolean = true;
  public resume: string = "";
  public description:string ="";
  public startDate:Date;
  public endDate:Date;
  public type:string;
  public location:string;
  public client:string;
  public opportunity:string;
  public opportunityName:string;
  public ID:string;
  public nomeClie:string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public provider: AppointmentsProvider, public modalCtrl : ModalController,
              public opportunityProvider:OpportunitiesProvider,
              public toastCtrl: ToastController,
              public contactProvider: ContactsProvider) {
    this.ID = this.navParams.get('ID');

    this.provider.getAppointment(this.ID).subscribe(
      data => {
        var appointment = data;

        if (appointment.Prioridade == 1)
          this.priority = true;
        else
          false;
        this.resume = appointment.Resumo;
        this.description = appointment.Descricao;
        this.startDate = appointment.DataInicio;
        this.endDate = appointment.DataFim;
        this.type = appointment.TipoDeTarefa;
        this.location = appointment.Localizacao;
        this.client = appointment.IDContacto;
        this.opportunity = appointment.IDTarefaOrigem;

        if (this.opportunity != "") {
          this.opportunityProvider.getOpportunity(this.opportunity).subscribe(
            data => {
              var op = data;
              this.opportunityName = op.NomeOport;
            },
              err =>{
              });
        }

        if(this.client != ""){
          this.contactProvider.getClientById(this.client).subscribe(
            data=> {
              var tmp = data;
              this.nomeClie = tmp.Nome;

            },
            err=>{
              this.contactProvider.getContactById(this.client).subscribe(
                data=>{
                  var tmp = data;
                  this.nomeClie = tmp.Nome;
              },
              err=>{

              }
              );
          });
        }

        console.log(appointment);
        console.log(this.resume + " " + this.description + " " + this.location);
      },
      err => {
        console.log(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAppointmentModalPage');
  }

  openOpportunity(){
    if(this.opportunity != "")
      this.navCtrl.push(OpportunityDetailsPage,{'opportunityID':this.opportunity});
  }

  editAppointment(){
    this.navCtrl.pop();
    let modal = this.modalCtrl.create(CreateAppointmentsModalPage,{ID:this.ID,hasOpp:false});
    modal.present()
  }

  deleteAppointment(){
    this.navCtrl.pop();
    this.provider.removeAppointment(this.ID).subscribe(
      data =>{
        this.notification("Removed Appointment with success!");
        },
        err =>{this.notification("Error at removing appointment!")

        });
    }

  notification(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      showCloseButton: true,
      position: 'top'
    });
    toast.present();
  }

}
