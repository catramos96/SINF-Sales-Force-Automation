import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactsProvider } from '../../../providers/contacts/contacts';

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

    this.contacts.getAllContacts().subscribe(
      data => { 
          this.targets = data;
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
    this.navCtrl.push("CreateTargetPage");
  }


}
