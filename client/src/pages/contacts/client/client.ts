import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactsProvider } from '../../../providers/contacts/contacts';

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {

  private showElement: boolean[] = [];
  private clients: JSON[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: ContactsProvider) {
  }

  ionViewDidLoad() {

    this.contacts.getAllClients().subscribe(
      data => { 
          this.clients = data;
      },
      err => {
        
      }
  );

  }

  public toggleElement(index) {
    index = parseInt(index);
    this.showElement[index] = !this.showElement[index];
  }
  
  public createTarget(){
    this.navCtrl.push("CreateClientPage");
  }

}
