import { Component ,ViewChild,
 ElementRef
} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AppointmentsProvider} from "../../../providers/appointments/appointments";

@IonicPage()
@Component({
  selector: 'page-create-appointments-modal',
  templateUrl: 'create-appointments-modal.html',
})
export class CreateAppointmentsModalPage {

  public types = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appointmentsProvider: AppointmentsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAppointmentsModalPage');
  }

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  getAppointmentsTypes(){
    this.appointmentsProvider.getAllTypes().subscribe(
      data => {
        this.types = data;
      },
      err => {
        console.log(err);
      });
  }

}
