import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, AbstractControl, Validators} from "@angular/forms";
import { ContactsProvider } from '../../../../providers/contacts/contacts';
import {SchedulePage} from "../../../schedule/schedule";


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

    private IdTarget:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private contacts: ContactsProvider) {
    this.IdTarget = navParams.get("firstParam");

    var names = [''];
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
            this.createTargetForm.get("name").setValue(this.currenttarget["Nome"]);
            this.createTargetForm.get("address").setValue(this.currenttarget["Morada"]);
            this.createTargetForm.get("zipcode").setValue(this.currenttarget["CodPostal"]);
            this.createTargetForm.get("location").setValue(this.currenttarget["Localidade"]);
            this.createTargetForm.get("country").setValue(this.currenttarget["Pais"]);
            this.createTargetForm.get("email").setValue(this.currenttarget["Email"]);
            this.createTargetForm.get("cellphone").setValue(this.currenttarget["Telemovel"]);
            this.createTargetForm.get("homephone").setValue(this.currenttarget["Telefone"]);
            this.createTargetForm.get("fax").setValue(this.currenttarget["Fax"]);
          }
      },
      err => {
      });


  }


  onSubmit(value: any): void {

        if(this.createTargetForm.valid) {
          var data = {
            "Entidade": this.currenttarget["Entidade"],
            "Nome": this.createTargetForm.value.name,
            "Morada": this.createTargetForm.value.address,
            "CodPostal": this.createTargetForm.value.zipcode,
            "Localidade": this.createTargetForm.value.location,
            "Pais": this.createTargetForm.value.country,
            "Email": this.createTargetForm.value.email,
            "Telemovel": this.createTargetForm.value.cellphone,
            "Telefone": this.createTargetForm.value.homephone,
            "Fax":this.createTargetForm.value.fax,
          }

          this.contacts.editContact(data, this.IdTarget).subscribe(
            data => {
              alert("Success editing Target!");
              this.navCtrl.setRoot(SchedulePage, {}, {animate: true, direction: 'forward'});
          },
          err => {
              alert("Error editing target!");
          })

        }
    }

}
