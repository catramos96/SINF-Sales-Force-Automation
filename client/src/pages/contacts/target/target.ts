import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactsProvider } from '../../../providers/contacts/contacts';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'target.html',
})
export class TargetPage {

  private showElement: boolean[] = [];
  private targets: JSON[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: ContactsProvider) {
    
  }

  ionViewDidLoad(){
    this.getContacts();
  }

  public getContacts(){
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

  public onCancel(ev){
    this.getContacts();
  }

  public editTarget(IdTarget:string){
    this.navCtrl.push("EditTargetPage",{firstParam:IdTarget});
  }

  searchContact(ev) {
    let name = ev.target.value;
    if(name !== ""){
      this.contacts.searchContact(name).subscribe(
        data => { 
          this.targets=data;
        },
        err => {
          
        });
    } 
    else 
    {
      this.targets = [];
      this.getContacts();
    }
  }

}
