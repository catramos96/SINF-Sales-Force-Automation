import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ClientPage } from '../../contacts/client/client';
import { TargetPage } from '../../contacts/target/target';

/**
 * Generated class for the CreateOpportunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-opportunity',
  templateUrl: 'create-opportunity.html',
})
export class CreateOpportunityPage {

  opp = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateOpportunityPage');
  }

  //modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

  getClient(){
    this.navCtrl.push(ClientPage,
      {
        isOpportunity: true,
        callback: this.getData
      });
  }
  getTarget(){
    this.navCtrl.push(TargetPage,
      {
        isOpportunity: true,
        callback: this.getData
      });
  }

  //TODO
  //receive client from contact list
  getData = (Nome,Id) =>
  {
    return new Promise((resolve, reject) => {
      console.log(">> " + Nome + "\n" + Id);
      resolve();
    });
  };
  
  createOpportunity() {
    console.log(this.opp)
  }

}
