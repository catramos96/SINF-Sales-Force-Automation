import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactsProvider } from '../../../providers/contacts/contacts';
import {FormGroup, FormBuilder, AbstractControl, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'client.html',
})
export class ClientPage {

  private showElement: boolean[] = [];
  private showCreateGroup: boolean;
  private clients: JSON[] = [];
  private createGroupForm: FormGroup;

  isOpportunity = false;
  callback = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder, private contacts: ContactsProvider) {

    this.createGroupForm = formBuilder.group({
      name:[''],
      id:[''],
    });
    
    this.isOpportunity = this.navParams.get('isOpportunity');
    this.callback = this.navParams.get('callback');
  }

  sendClient(){
    console.log("ok");
    this.callback("Nome","ID").then(()=>{ this.navCtrl.pop() });
  }

  ionViewDidLoad() {
    this.showCreateGroup = false;
    this.getClients();
  }

  public getClients(){
    this.contacts.getAllClients().subscribe(
      data => { 
          this.clients = data;
      },
      err => {
        
      });
  }

  public onCancel(ev){
    this.getClients();
  }

  public toggleElement(index) {
    index = parseInt(index);
    this.showElement[index] = !this.showElement[index];
  }

  public toggleCreateGroup(){
    this.showCreateGroup = !this.showCreateGroup;
  }
  
  public createClient(){
    this.navCtrl.push("CreateClientPage");
  }

  public editClient(codCliente:string){
    this.navCtrl.push("EditClientPage",{firstParam:codCliente});
  }

  searchClient(ev) {
    let name = ev.target.value;
    if(name !== ""){
      this.contacts.searchClient(name).subscribe(
        data => { 
          this.clients=data;
        },
        err => {
          
        });
    } 
    else 
    {
      this.clients = [];
      this.getClients();
    }
  }

  onSubmit(value: any): void { 
    
        if(this.createGroupForm.valid) {
          var data = {
            "Id":this.createGroupForm.value.id,
            "Descricao":this.createGroupForm.value.name
          }
    
          this.contacts.postGroup(data).subscribe(
            data => { 
              console.log(data);
          },
          err => {
              console.log(err);
              alert(err);
          })    
            
        }
}

}
