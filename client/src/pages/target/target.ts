import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';
/**
 * Generated class for the TargetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-target',
  templateUrl: 'target.html',
})
export class TargetPage {

  private showElement: boolean[] = [];
  private targets: JSON[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: ContactsProvider) {
    
  }

  ionViewDidLoad(){

    this.contacts.getAllClients().subscribe(
      data => { 
          console.log(data);
          this.targets = data;
      },
      err => {
          console.log(err);
      }
  );

  }

  public toggleElement(index) {
    index = parseInt(index);
    this.showElement[index] = !this.showElement[index];
  }
  


}
