import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateOpportunityPage');
  }

  //campos : Titulo, Descricao, cliente (ir a lista de contactos)
  //automatico : creation date 

}
