import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ContactsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  targetRoot = 'TargetPage'
  clientRoot = 'ClientPage'
  otherRoot = 'OtherPage'


  constructor(public navCtrl: NavController) {}

}
