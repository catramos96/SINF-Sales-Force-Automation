import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { OpportunitiesProvider } from '../../providers/opportunities/opportunities';
import { OpportunityModalPage } from './opportunity-modal/opportunity-modal';


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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private opportunitiesService: OpportunitiesProvider,
    private modalCtrl : ModalController) {}

  ionViewDidLoad() {
    //this.navParams.get();
    this.getOpportunities();
  }

  openModal(oppID) {
    let modal = this.modalCtrl.create(OpportunityModalPage,{ opportunityID: oppID });
    modal.present();
  }

  displayOpportunities(){
    var colsLength = 3;
    var totalLength = this.opp.length;
    var rowsLength = Math.round(totalLength/colsLength);
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

  getOpportunities(){
    
    this.opportunitiesService.getOpportunities().subscribe(
      data => { 
        this.opp = data;
        this.displayOpportunities();
      },
      err => {
          console.log(err);
      });
      
      /*
      this.opp = [
        {
          Lead:{
            ID : "1",
            NomeCliente : "Antonio",
            ContactoCliente : "963852714",
            Descricao : "Encomenda de coisas",
            DataCriacao : "13/9/2017"
          }
        },
        {
          Lead:{
            ID : "1",
            NomeCliente : "Antonio",
            ContactoCliente : "963852714",
            Descricao : "Encomenda de coisas",
            DataCriacao : "13/9/2017"
          }
        },
      ];
      */
  }

}