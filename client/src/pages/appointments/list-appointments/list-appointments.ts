import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppointmentsProvider } from '../../../providers/appointments/appointments';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ViewAppointmentModalPage } from '../view-appointment-modal/view-appointment-modal';
import { CreateAppointmentsModalPage } from '../create-appointments-modal/create-appointments-modal';


/**
 * Generated class for the ListAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-appointments',
  templateUrl: 'list-appointments.html',
})
export class ListAppointmentsPage {

  private appointments;
  private IdOpportunity;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppointmentsProvider,
    private modalCtrl: ModalController
  ) {
    this.IdOpportunity = this.navParams.get('opportunityID');
    this.getAppointments(this.IdOpportunity);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAppointmentsPage');
  }

  getAppointments(id){
    this.appService.getAppointmentsByOpportunity(id).subscribe(
      data => {
        this.appointments = data;
        //change date
        this.appointments.forEach(element => {
          let date1 = element.DataInicio;
          element.DataInicio = date1.substr(0,10) + ", " +date1.substr(11,15);

          let date2 = element.DataFim;
          element.DataFim = date2.substr(0,10) + ", " +date2.substr(11,15);
        });
      },
      err => {
          console.log(err);
      });
  }

  goToDetails(id){
    let modal = this.modalCtrl.create(ViewAppointmentModalPage, {ID: id});
    modal.present();
  }

  createAppointment(){
    let modal = this.modalCtrl.create(CreateAppointmentsModalPage, 
      {
        ID: "",
        hasOpp: "true",
        opportunityId: this.IdOpportunity
      });
    modal.present();
  }
}
