import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppointmentsProvider } from '../../../providers/appointments/appointments';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ViewAppointmentModalPage } from '../view-appointment-modal/view-appointment-modal';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppointmentsProvider,
    private modalCtrl: ModalController
  ) {

    let id = this.navParams.get('opportunityID');
    this.getAppointments(id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAppointmentsPage');
  }

  getAppointments(id){
    this.appService.getAppointmentsByOpportunity(id).subscribe(
      data => {
        this.appointments = data;
      },
      err => {
          console.log(err);
      });
  }

  goToDetails(id){
    let modal = this.modalCtrl.create(ViewAppointmentModalPage,{ID:id});
    modal.present();
  }
}
