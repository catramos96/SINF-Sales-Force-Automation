import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, AbstractControl, Validators} from "@angular/forms";
import { VendorsProvider } from '../../providers/vendors/vendors';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../../pages/home/home';
import { Events } from 'ionic-angular';

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
        "Notas":"Username:"+this.loginVendorForm.value.username.trim()+"&Password:"+this.loginVendorForm.value.password.trim()+"&"
      }

      this.vendors.login(data).subscribe(
        data => { 
          alert("sucesso");
          var role = data.json()["Notas"].substring(data.json()["Notas"].indexOf("Role") + 5);

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
          
         this.events.publish('user:loggedin', true, true); 
         this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
      },
      err => {
          console.log(err);
          alert("Error on log in action!");
      }) 

    }
}

}
