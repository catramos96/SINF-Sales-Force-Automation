import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, AbstractControl, Validators} from "@angular/forms";
import { VendorsProvider } from '../../providers/vendors/vendors';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';
import {SchedulePage} from "../schedule/schedule";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginVendorForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private vendors: VendorsProvider, private nativeStorage: NativeStorage, public events: Events) {
    this.loginVendorForm = formBuilder.group({
      username: [''],
      password:[''],
  });

  }

  ionViewDidLoad() {


  }

  onSubmit(value: any): void {


    if(this.loginVendorForm.valid) {
      var data = {
        "Username":this.loginVendorForm.value.username.trim(),
        "Password":this.loginVendorForm.value.password.trim()
      }

      this.vendors.login(data).subscribe(
        data => { 
          alert("Sucesso!");
          var role = data.json()["Role"];

          this.nativeStorage.clear();

          for (var p in data.json()) {
            if( data.json().hasOwnProperty(p) ) {
              this.nativeStorage.setItem(p,data.json()[p]);
            }
          }

          if(role == "Chefe" || role == "Vendedor") {
            this.nativeStorage.setItem("CurrentVendor",data.json());
            this.nativeStorage.setItem("Role",role);
          }

          if(role == "Chefe"){
            this.events.publish('user:loggedin', true, true);
          } else {
            this.events.publish('user:loggedin', true, false);
          }
         
         this.navCtrl.setRoot(SchedulePage, {}, {animate: true, direction: 'forward'});
      },
      err => {
          console.log(err);
          alert("Error on log in action!");
      })

    }
}

}
