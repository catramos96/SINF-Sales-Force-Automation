import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { OpportunitiesProvider } from '../../providers/opportunities/opportunities';
import { OpportunityDetailsPage } from './opportunity-details/opportunity-details';
import { CreateOpportunityPage } from './create-opportunity/create-opportunity';


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