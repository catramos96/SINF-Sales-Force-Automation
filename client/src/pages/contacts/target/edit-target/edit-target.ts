import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, AbstractControl, Validators} from "@angular/forms";
import { ContactsProvider } from '../../../../providers/contacts/contacts';


@IonicPage()
@Component({
  selector: 'page-edit-target',
  templateUrl: 'edit-target.html',
})
export class EditTargetPage {

  createTargetForm: FormGroup;
  
    private groups: JSON[] = [];
    private currenttargets: JSON[] = [];
    private currenttarget: JSON;
    private CodTarget:string;

    private IdTarget:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private contacts: ContactsProvider) {
    this.IdTarget = navParams.get("firstParam");

    var names = [''];
    var phones = [''];

    this.createTargetForm = formBuilder.group({
      firstname: names,
      intermediatenames: names,
      lastname: names,
      email:[''],
      cellphone:phones,
      homephone:phones,
      notes:[''],
      taxnumber:[''],
      address:[''],
      zipcode:[''],
      location:[''],
      country:[''],
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


      this.contacts.getContactById(this.IdTarget).subscribe(
        data => { 
          this.currenttargets = data;
          if(this.currenttargets.length != 0){
            this.currenttarget = this.currenttargets[0];
            this.CodTarget = this.currenttarget["ContactoDef"];
            this.createTargetForm.get("firstname").setValue(this.currenttarget["PrimeiroNome"]);
            this.createTargetForm.get("intermediatenames").setValue(this.currenttarget["NomesIntermedios"]);
            this.createTargetForm.get("lastname").setValue(this.currenttarget["UltimoNome"]);
            this.createTargetForm.get("taxnumber").setValue(this.currenttarget["NumContribuint"]);
            this.createTargetForm.get("address").setValue(this.currenttarget["Morada"]);
            this.createTargetForm.get("zipcode").setValue(this.currenttarget["CodPostal"]);
            this.createTargetForm.get("location").setValue(this.currenttarget["Localidade"]);
            this.createTargetForm.get("country").setValue(this.currenttarget["Pais"]);
            this.createTargetForm.get("email").setValue(this.currenttarget["Email"]);
            this.createTargetForm.get("cellphone").setValue(this.currenttarget["Telemovel"]);
            this.createTargetForm.get("homephone").setValue(this.currenttarget["Telefone"]);
            this.createTargetForm.get("notes").setValue(this.currenttarget["Notas"]);
          }
      },
      err => {
      });


  }


  onSubmit(value: any): void { 
    
        if(this.createTargetForm.valid) {
          var data = {
            "ContactoDef":this.CodTarget,
            "Id":this.IdTarget,
            "PrimeiroNome":this.createTargetForm.value.firstname,
            "NomesIntermedios":this.createTargetForm.value.intermediatenames,
            "UltimoNome":this.createTargetForm.value.lastname,
            "NumContribuinte":this.createTargetForm.value.taxnumber,
            "Morada":this.createTargetForm.value.address,
            "CodPostal":this.createTargetForm.value.zipcode,
            "Localidade":this.createTargetForm.value.location,
            "Pais":this.createTargetForm.value.country,
            "Email":this.createTargetForm.value.email,
            "Telemovel":this.createTargetForm.value.cellphone,
            "Telefone":this.createTargetForm.value.homephone,
            "Notas":this.createTargetForm.value.notes
          }
    
          this.contacts.editContact(data, this.IdTarget).subscribe(
            data => { 
              console.log(data);
          },
          err => {
              console.log(err);
              alert("Error creating target!");
          })    
            
        }
    }  

}
