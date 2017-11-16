import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, AbstractControl, Validators} from "@angular/forms";
import { ContactsProvider } from '../../../../providers/contacts/contacts';

@IonicPage()
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html',
})
export class EditClientPage {

  createClientForm: FormGroup;
  
    private groups: JSON[] = [];
    private currentclient: JSON;

    private CodCliente:string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private contacts: ContactsProvider) {
  
      this.CodCliente = navParams.get("firstParam");

      var names = [''];
      var phones = [''];

      this.createClientForm = formBuilder.group({
        codcliente:[''],
        fullname: names,
        email:[''],
        cellphone:phones,
        homephone:phones,
        fax:[''],
        notes:[''],
        taxnumber:[''],
        address:[''],
        zipcode:[''],
        location:[''],
        country:[''],
        website:[''],
        group:[''],
        currency:['']
    });
  }
  ionViewDidLoad() {

    this.contacts.getClientById(this.CodCliente).subscribe(
      data => { 
        console.log(data);
        this.currentclient = data;
        this.createClientForm.get("codcliente").setValue(this.currentclient["CodCliente"]);
        this.createClientForm.get("fullname").setValue(this.currentclient["Nome"]);
        this.createClientForm.get("email").setValue(this.currentclient["Email"]);
        this.createClientForm.get("cellphone").setValue(this.currentclient["Telemovel"]);
        this.createClientForm.get("homephone").setValue(this.currentclient["Telefone"]);
        this.createClientForm.get("fax").setValue(this.currentclient["Fax"]);
        this.createClientForm.get("notes").setValue(this.currentclient["Notas"]);
        this.createClientForm.get("taxnumber").setValue(this.currentclient["NumContribuinte"]);
        this.createClientForm.get("address").setValue(this.currentclient["Morada"]);
        this.createClientForm.get("zipcode").setValue(this.currentclient["CodPostal"]);
        this.createClientForm.get("location").setValue(this.currentclient["Localidade"]);
        this.createClientForm.get("country").setValue(this.currentclient["Pais"]);
        this.createClientForm.get("website").setValue(this.currentclient["EnderecoWeb"]);
        this.createClientForm.get("currency").setValue(this.currentclient["Moeda"]);
    },
    err => {
    });


    this.contacts.getAllGroups().subscribe(
      data => { 
          this.groups = data;
          console.log(data);

       // this.createClientForm.get("group").setValue(this.currentclient["GrupoDesc"]);
      },
      err => {
        
      });
  }



  onSubmit(value: any): void { 
    
        if(this.createClientForm.valid) {
          var data = {
            "CodCliente":this.createClientForm.value.codcliente,
            "Nome":this.createClientForm.value.fullname,
            "Morada":this.createClientForm.value.address,
            "Localidade":this.createClientForm.value.location,
            "CodPostal":this.createClientForm.value.zipcode,
            "Pais":this.createClientForm.value.country,
            "Email":this.createClientForm.value.email,
            "Telemovel":this.createClientForm.value.cellphone,
            "Telefone":this.createClientForm.value.homephone,
            "Fax":this.createClientForm.value.fax,
            "TotalDeb":0,
            "NumContribuinte":this.createClientForm.value.taxnumber,
            "EnderecoWeb":this.createClientForm.value.website,
            "EncomendasPendentes":0,
            "Notas":this.createClientForm.value.notes,
            "Group":this.createClientForm.value.group,
            "Vendedor":"1",
            "Inactivo":0,
            "Moeda":this.createClientForm.value.currency
          }
    
          this.contacts.editClient(data, this.createClientForm.value.codcliente).subscribe(
            data => { 
              console.log(data);
          },
          err => {
              console.log(err);
              alert(err);
              alert("Error editing Client!");
          })    
            
        }

      }
}
