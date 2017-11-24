import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

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

  
  createOpportunity() {
    console.log(this.opp)
  }


}
