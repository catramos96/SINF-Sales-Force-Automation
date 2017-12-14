import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { OpportunitiesProvider } from '../../providers/opportunities/opportunities';
import { OpportunityDetailsPage } from './opportunity-details/opportunity-details';
import { CreateOpportunityPage } from './create-opportunity/create-opportunity';
import { NativeStorage } from '@ionic-native/native-storage';
import { ListAppointmentsPage } from '../appointments/list-appointments/list-appointments';


/**
 * Generated class for the OpportunitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opportunities',
  templateUrl: 'opportunities.html',
})
export class OpportunitiesPage {

  opp = [];
  isApp = false;
  callback = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private opportunitiesService: OpportunitiesProvider,
    private modalCtrl : ModalController,
    private nativeStorage: NativeStorage
  ) {}

  ionViewDidLoad() {

    this.isApp = this.navParams.get('isApp');
    this.callback = this.navParams.get('callback');

    this.getOpportunities();
  }

  createOpportunity(){
    let modal = this.modalCtrl.create(CreateOpportunityPage);
    modal.present();
  }
  
  openOpportunity(oppID) {
    this.navCtrl.push(OpportunityDetailsPage,
      {
        opportunityID: oppID
      });
  }

  openAppointments(oppID){
    this.navCtrl.push(ListAppointmentsPage,
      {
        opportunityID: oppID
      });
  }

  displayOpportunities(){
    var colsLength = 3;
    var totalLength = this.opp.length;
    var rowsLength = Math.ceil(totalLength/colsLength);
    var rows = [];
    var r,c,maxCol;
    for(r = 0; r < rowsLength; r++)
    {
      var cols = [];
      maxCol = (r+1)*colsLength;
      for(c = r*colsLength; c < maxCol; c++){
        if(c >= maxCol)
          cols.push(null);
        else
          cols.push(this.opp[c]);
      }
      rows.push({row: cols});
    }

    this.opp = rows;
  }
  
  sendOpportunity(ID,Name){
    this.callback(ID,Name).then(()=>{ this.navCtrl.pop() });
  }

  getOpportunities(){
    //this.nativeStorage.getItem("Id").then(
      //data => {
        this.opportunitiesService.getOpportunities(1).subscribe(
          data => { 
            alert(data);
            this.opp = data;
            this.displayOpportunities();
          },
          err => {
            alert(err);
            console.log(err);
          });
      //},
      //err => {

      //}
    //);
    
      /*
      
      this.opp = [
        {
          ID : "1",
          NomeCliente : "Antonio",
          ContactoCliente : "963852714",
          Descricao : "Encomenda de coisas",
          DataCriacao : "13/9/2017"
        },
        {
          ID : "1",
          NomeCliente : "Antonio",
          ContactoCliente : "963852714",
          Descricao : "Encomenda de coisas",
          DataCriacao : "13/9/2017"
        },
      ];
      this.displayOpportunities();
      console.log(this.opp);
      */
      
  }

}