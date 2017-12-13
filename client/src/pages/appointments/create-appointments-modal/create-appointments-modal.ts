import { Component ,ViewChild,
 ElementRef
} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OpportunitiesPage } from '../../opportunities/opportunities';

@IonicPage()
@Component({
  selector: 'page-create-appointments-modal',
  templateUrl: 'create-appointments-modal.html',
})
export class CreateAppointmentsModalPage {

  private opportunityId;
  private tempName;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAppointmentsModalPage');
  }

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  getOpportunity(){
    this.navCtrl.push(OpportunitiesPage,
      {
        getApp: true,
        callback: this.getData
      });
  }

  getData = (Id,Nome) =>
  {
    return new Promise((resolve, reject) => { 
      this.opportunityId = Id;
      this.tempName = name;
      resolve();
    });
  };



}
