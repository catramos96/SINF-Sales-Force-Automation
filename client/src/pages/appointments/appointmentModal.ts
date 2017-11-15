import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, NavController} from 'ionic-angular';
import {getDateString} from "../calendar-resources";

@Component({
  selector: 'page-appointment',
  templateUrl: 'appointmentModal.html'
})

export class AppointmentModal {

  public description = "Board Discussion about the financial problems in the company";
  public hours = "10:00 - 12:00";
  public address = "Avenue of France, number 252. 4400-400";
  public tags = ["Meeting","Opportunity"];
  public group = "Enterprise x";
  public client = "Client x";
  public previousAppointment = getDateString(new Date(Date.now()));

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              private navCtrl: NavController) {
    this.loadTags();
  }

  loadTags(){ //id como parametro

    var html:string = "";

    if(this.tags.length > 0){
      for(var i = 0; i < this.tags.length; i++){
        html +='<a class="tag">' + this.tags[i] + '<a>';    //Por com href para redirecionar
      }
    }

    document.getElementById("tags").insertAdjacentHTML("beforeend", html);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }


}
