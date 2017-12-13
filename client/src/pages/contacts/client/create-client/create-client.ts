import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { ContactsProvider } from '../../../../providers/contacts/contacts';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../../../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-create-client',
  templateUrl: 'create-client.html',
})
export class CreateClientPage {

  createClientForm: FormGroup;

  private groups: JSON[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private contacts: ContactsProvider, private nativeStorage: NativeStorage) {

    var names = [''];
    var phones = [''];

    this.createClientForm = formBuilder.group({
      codcliente: [''],
      fullname: names,
      email: [''],
      cellphone: phones,
      homephone: phones,
      fax: [''],
      notes: [''],
      taxnumber: [''],
      address: [''],
      zipcode: [''],
      location: [''],
      country: [''],
      website: [''],
      group: [''],
      currency: ['']
    });
  }

  ionViewDidLoad() {

    this.contacts.getAllGroups().subscribe(
      data => {
        this.groups = data;
        console.log(data);
      },
      err => {

      });

  }

  onSubmit(value: any): void {

    this.nativeStorage.getItem("Id").then(
      data => {
        if (this.createClientForm.valid) {
          var dataSend = {
            "CodCliente": this.createClientForm.value.codcliente,
            "Nome": this.createClientForm.value.fullname,
            "Morada": this.createClientForm.value.address,
            "Localidade": this.createClientForm.value.location,
            "CodPostal": this.createClientForm.value.zipcode,
            "Pais": this.createClientForm.value.country,
            "Email": this.createClientForm.value.email,
            "Telemovel": this.createClientForm.value.cellphone,
            "Telefone": this.createClientForm.value.homephone,
            "Fax": this.createClientForm.value.fax,
            "TotalDeb": 0,
            "NumContribuinte": this.createClientForm.value.taxnumber,
            "EnderecoWeb": this.createClientForm.value.website,
            "EncomendasPendentes": 0,
            "Notas": this.createClientForm.value.notes,
            "Group": this.createClientForm.value.group,
            "Vendedor": data,
            "Inactivo": 0,
            "Moeda": this.createClientForm.value.currency
          }

          this.contacts.postClient(dataSend).subscribe(
            data => {
              alert("Success creating Client!");
              this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
            },
            err => {
              alert("Error creating Client!");
            });
        }

      });
  }
}

