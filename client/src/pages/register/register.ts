import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.set("ola", "hi");
    this.storage.get("ola").then((value) => {alert(value)});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
