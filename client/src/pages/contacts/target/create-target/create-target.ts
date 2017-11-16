import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, AbstractControl, Validators} from "@angular/forms";
import { ContactsProvider } from '../../../../providers/contacts/contacts';

@IonicPage()
@Component({
  selector: 'page-create-target',
  templateUrl: 'create-target.html',
})
export class CreateTargetPage {

  createTargetForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private contacts: ContactsProvider) {

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
      title:[''],
      address:[''],
      zipcode:[''],
      location:[''],
      country:[''],
  });
  }
  
  ionViewDidLoad(){

  }

  onSubmit(value: any): void { 

    

    if(this.createTargetForm.valid) {
      var data = {
        "PrimeiroNome":this.createTargetForm.value.firstname,
        "NomesIntermedios":this.createTargetForm.value.intermediatenames,
        "UltimoNome":this.createTargetForm.value.lastname,
        "NumContribuinte":this.createTargetForm.value.taxnumber,
        "Titulo":this.createTargetForm.value.title,
        "Morada":this.createTargetForm.value.address,
        "CodPostal":this.createTargetForm.value.zipcode,
        "Localidade":this.createTargetForm.value.location,
        "Pais":this.createTargetForm.value.country,
        "Email":this.createTargetForm.value.email,
        "Telemovel":this.createTargetForm.value.cellphone,
        "Telefone":this.createTargetForm.value.homephone,
        "Notas":this.createTargetForm.value.notes
      }

      this.contacts.postTarget(data).subscribe(
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
