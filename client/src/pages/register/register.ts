import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { VendorsProvider } from '../../providers/vendors/vendors';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createVendorForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private vendors: VendorsProvider, private nativeStorage: NativeStorage) {

    var phones = [''];

    this.createVendorForm = formBuilder.group({
      name: [''],
      email: [''],
      fax: [''],
      cellphone: phones,
      homephone: phones,
      address: [''],
      zipcode: [''],
      location: [''],
      username: [''],
      password: [''],
    });
  }

  ionViewDidLoad() {

  }

  onSubmit(value: any): void {

    if (this.createVendorForm.valid) {
      var data;
      this.nativeStorage.getItem("Id").then(chefeId => {
        data = {
          "Nome": this.createVendorForm.value.name,
          "Morada": this.createVendorForm.value.address,
          "Localidade": this.createVendorForm.value.location,
          "CodPostal": this.createVendorForm.value.zipcode,
          "Pais": this.createVendorForm.value.country,
          "Email": this.createVendorForm.value.email,
          "Telemovel": this.createVendorForm.value.cellphone,
          "Telefone": this.createVendorForm.value.homephone,
          "Fax": this.createVendorForm.value.fax,
          "Username": this.createVendorForm.value.username.trim(),
          "Password": this.createVendorForm.value.password.trim(),
          "Role": "Vendedor",
          "Chefe": chefeId
        }
      });

      this.vendors.createVendor(data).subscribe(
        data => {
          console.log(data);
          alert("Success creating Client!");
          this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
        },
        err => {
          console.log(err);
          alert("Error creating Client!");
        })

    }



  }

}
