import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { ContactsProvider } from '../../../../providers/contacts/contacts';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../../../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-create-target',
  templateUrl: 'create-target.html',
})
export class CreateTargetPage {

  createTargetForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private contacts: ContactsProvider, private nativeStorage: NativeStorage) {

    var phones = [''];

    this.createTargetForm = formBuilder.group({
      name: [''],
      email: [''],
      cellphone: phones,
      homephone: phones,
      address: [''],
      zipcode: [''],
      location: [''],
      country: [''],
      fax:[''],
    });
  }

  ionViewDidLoad() {

  }

  onSubmit(value: any): void {

    if (this.createTargetForm.valid) {
      this.nativeStorage.getItem("Id").then(
        data => {
          var dataSend = {
            "Nome": this.createTargetForm.value.name,
            "Morada": this.createTargetForm.value.address,
            "CodPostal": this.createTargetForm.value.zipcode,
            "Localidade": this.createTargetForm.value.location,
            "Pais": this.createTargetForm.value.country,
            "Email": this.createTargetForm.value.email,
            "Telemovel": this.createTargetForm.value.cellphone,
            "Telefone": this.createTargetForm.value.homephone,
            "Fax":this.createTargetForm.value.fax,
            "Vendedor": data
          }

          this.contacts.postTarget(dataSend).subscribe(
            data => {
              alert("Success creating Target!");
              this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
            },
            err => {
              alert("Error creating Target!");
            })

        },
        error =>{ alert("Please Login before you create a target!");}
      );

    }

  }
}
