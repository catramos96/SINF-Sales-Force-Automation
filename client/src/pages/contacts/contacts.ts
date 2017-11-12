import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  targetRoot = 'TargetPage'
  clientRoot = 'ClientPage'


  constructor(public navCtrl: NavController) {}

}
