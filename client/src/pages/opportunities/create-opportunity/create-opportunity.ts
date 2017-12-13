import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { OpportunitiesProvider } from '../../../providers/opportunities/opportunities';
import { ClientPage } from '../../contacts/client/client';
import { TargetPage } from '../../contacts/target/target';
import { NativeStorage } from '@ionic-native/native-storage';

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

  opp = { CodCliente:"", Vendedor: "" };
  tempName = "";
  tempCode = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private opportunitiesService: OpportunitiesProvider,
    private alertCtrl : AlertController,
    private nativeStorage: NativeStorage
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

  getData = (Nome,Id) =>
  {
    return new Promise((resolve, reject) => { 
      this.tempCode = Id;
      this.tempName = Nome;
      resolve();
    });
  };
  
  //confirmar
  createOpportunity() 
  {
    this.nativeStorage.getItem("Id").then(
      data => {
        this.opp.CodCliente = this.tempCode;
        this.opp.Vendedor = data;
        this.opportunitiesService.createOpportunity(this.opp).subscribe(
          data => { 
              console.log("created");
              let alert = this.alertCtrl.create({
                title: 'Create Opportunity',
                subTitle: 'Opportunity created successfuly',
                buttons: ['Dismiss']
              });
              alert.present();
              this.dismiss();
          },
          err => {
              console.log(err);
          });
      });
  }
}
