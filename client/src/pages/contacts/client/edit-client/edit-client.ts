import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { ContactsProvider } from '../../../../providers/contacts/contacts';
import { NativeStorage } from '@ionic-native/native-storage';
import {SchedulePage} from "../../../schedule/schedule";
import { ClientPage } from '../client';

@IonicPage()
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html',
})
export class EditClientPage {

  createClientForm: FormGroup;

  private groups: JSON[] = [];
  private currentclients: JSON[] = [];
  private currentclient: JSON;

  private CodCliente: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private contacts: ContactsProvider, private nativeStorage: NativeStorage) {

    this.CodCliente = navParams.get("firstParam");
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

    this.contacts.getClientById(this.CodCliente).subscribe(
      data => {
        this.currentclients = data;
        if (this.currentclients.length != 0) {
          this.currentclient = this.currentclients[0];
          this.createClientForm.get("codcliente").setValue(this.currentclient["CodCliente"]);
          this.createClientForm.get("fullname").setValue(this.currentclient["Nome"]);
          this.createClientForm.get("email").setValue(this.currentclient["Email"]);
          this.createClientForm.get("cellphone").setValue(this.currentclient["Telemovel"]);
          this.createClientForm.get("fax").setValue(this.currentclient["Fax"]);
          this.createClientForm.get("notes").setValue(this.currentclient["Notas"]);
          this.createClientForm.get("taxnumber").setValue(this.currentclient["NumContribuinte"]);
          this.createClientForm.get("address").setValue(this.currentclient["Morada"]);
          this.createClientForm.get("zipcode").setValue(this.currentclient["CodPostal"]);
          this.createClientForm.get("location").setValue(this.currentclient["Localidade"]);
          this.createClientForm.get("country").setValue(this.currentclient["Pais"]);
          this.createClientForm.get("website").setValue(this.currentclient["EnderecoWeb"]);
          this.createClientForm.get("currency").setValue(this.currentclient["Moeda"]);
          this.createClientForm.get("group").setValue(this.currentclient["GrupoDesc"]);
        }
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

          this.contacts.editClient(dataSend, this.CodCliente).subscribe(
            data => {
              alert("Success editing Client!");
              this.navCtrl.setRoot(ClientPage, {}, { animate: true, direction: 'forward' });
            },
            err => {
              alert("Error editing Client!");
            });

        }

      });
  }
}
