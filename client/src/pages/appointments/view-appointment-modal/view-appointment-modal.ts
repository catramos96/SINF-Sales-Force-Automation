import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppointmentsProvider} from "../../../providers/appointments/appointments";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public provider: AppointmentsProvider) {
    let id = this.navParams.get('ID');

    this.provider.getAppointment(id).subscribe(
      data => {
        var appointment = data;

        if(appointment.Prioridade == 1)
          this.priority = true;
        else
          false;
        this.resume = appointment.Resumo;
        this.description = appointment.Descrição;
        this.startDate = appointment.DataInicio;
        this.endDate = appointment.DataFim;
        this.type = appointment.TipoDeTarefa;
        this.location = appointment.Localização;
        this.client = appointment.IDContacto;
        this.opportunity = appointment.IDTarefaOrigem;

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

}