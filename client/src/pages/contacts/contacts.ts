import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  targetRoot = 'TargetPage'
  clientRoot = 'ClientPage'

  params = { isOpportunity: false , callback: null };

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ) {
    let param1  = this.navParams.get('isOpportunity');
    let param2  = this.navParams.get('callback');
    this.params = { isOpportunity: param1 , callback: param2 };
  }

}
