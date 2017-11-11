import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, AbstractControl, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-create-target',
  templateUrl: 'create-target.html',
})
export class CreateTargetPage {

  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.authForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  });
  }
  
  ionViewDidLoad(){

  }

  onSubmit(value: any): void { 
    if(this.authForm.valid) {

        
    }
}  

}
