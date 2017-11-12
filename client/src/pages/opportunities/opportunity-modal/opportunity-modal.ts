import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OpportunitiesProvider } from '../../../providers/opportunities/opportunities';

/**
 * Generated class for the OpportunityModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-opportunity-modal',
  templateUrl: 'opportunity-modal.html',
})
export class OpportunityModalPage {

  opp = {
    ID:"", NomeCliente:"", ContactoCliente:"", Descricao:"", DataCriacao:"", PrecoTotal: "", Artigos: []
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private opportunitiesService: OpportunitiesProvider,
    public viewCtrl: ViewController
  ) {
      let name = this.navParams.get('opportunityID');
      this.getOpportunity(name);  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpportunityModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getOpportunity(name){
    /*
    this.opportunitiesService.getOpportunity(name).subscribe(
      data => { 
          this.opportunity = data;
      },
      err => {
          console.log(err);
      });
    */
    this.opp = {
      ID : "1",
      NomeCliente : "Antonio",
      ContactoCliente : "963852714",
      Descricao : "Encomenda de coisas",
      DataCriacao : "13/9/2017",
      PrecoTotal : "26",
      Artigos : [
        {
          NomeArtigo : "Artigo 1",
          IDArtigo: "A0001",
          PrecoPorUnidade: "13",
          Quantidade: "2",
          Preco: "26",
        }
      ]
    };
  }

}
