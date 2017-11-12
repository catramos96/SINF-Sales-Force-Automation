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

  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private contacts: ContactsProvider) {

    var names = ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])]
    var phones = [''];

    this.authForm = formBuilder.group({
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

    

    if(this.authForm.valid) {
      var data = {
        "PrimeiroNome":this.authForm.value.firstname,
        "NomesIntermedios":this.authForm.value.intermediatenames,
        "UltimoNome":this.authForm.value.lastname,
        "NumContribuinte":this.authForm.value.taxnumber,
        "Titulo":this.authForm.value.title,
        "Morada":this.authForm.value.address,
        "CodPostal":this.authForm.value.zipcode,
        "Localidade":this.authForm.value.location,
        "Pais":this.authForm.value.country,
        "Email":this.authForm.value.email,
        "Telemovel":this.authForm.value.cellphone,
        "Telefone":this.authForm.value.homephone,
        "Notas":this.authForm.value.notes
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
