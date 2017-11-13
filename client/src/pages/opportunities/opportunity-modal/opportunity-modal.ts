import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OpportunitiesProvider } from '../../../providers/opportunities/opportunities';
import { ProductPage } from '../../product/product';

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
    ID:"", NomeCliente:"", ContactoCliente:"", Descricao:"", DataCriacao:"", PrecoTotal: -1, Artigos: []
  };
  dataID = -1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private opportunitiesService: OpportunitiesProvider,
    public viewCtrl: ViewController
  ) {
      let id = this.navParams.get('opportunityID');
      this.getOpportunity(id);  
  }

  ionViewDidLoad() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  removeProduct(productID, opportunityID){
    for(let i = 0; i < this.opp.Artigos.length; i++){
      if(this.opp.Artigos[i].IDArtigo === productID){
        this.opp.PrecoTotal -= this.opp.Artigos[i].Preco;
        this.opp.Artigos.splice(i, 1);
        break;
      }
    }
  }

  addProducts(){
    this.navCtrl.push(ProductPage,
      {
        isOpportunity: true, 
        callback: this.getData
      });
  } 

  getData = (data) =>
  {
    return new Promise((resolve, reject) => {
      for(let i = 0; i < data.length; i++)
      {
        var hasElement = false;
        this.opp.Artigos.forEach( element => {
          if(element.IDArtigo === data[i].IDArtigo){
            element.Quantidade += 1;
            this.opp.PrecoTotal += element.PrecoPorUnidade;
            hasElement = true;
          }
        });
        //add in case of the element is new
        if(!hasElement)
        {
          this.opp.Artigos.push(data[i]);
          this.opp.PrecoTotal += data[i].PrecoPorUnidade;
        }
      }
      resolve();
    });
  };

  addQuantity(productID){
    for(let i = 0; i < this.opp.Artigos.length; i++){
      if(this.opp.Artigos[i].IDArtigo === productID){
        this.opp.Artigos[i].Preco += this.opp.Artigos[i].PrecoPorUnidade;
        this.opp.PrecoTotal += this.opp.Artigos[i].PrecoPorUnidade;
        this.opp.Artigos[i].Quantidade += 1;
        break;
      }
    }
  }

  removeQuantity(productID){
    for(let i = 0; i < this.opp.Artigos.length; i++){
      if(this.opp.Artigos[i].IDArtigo === productID && this.opp.Artigos[i].Quantidade > 0){
        this.opp.Artigos[i].Preco -= this.opp.Artigos[i].PrecoPorUnidade;
        this.opp.PrecoTotal -= this.opp.Artigos[i].PrecoPorUnidade;
        this.opp.Artigos[i].Quantidade -= 1;
        break;
      }
    }
  }

  cancelOpportunity(){
    this.getOpportunity(this.opp.ID);
  }

  saveOpportunity(){
    let jsonArtigos = [];

    this.opp.Artigos.forEach(art => {
      let jsonArt ={
        IDArtigo : art.IDArtigo,
        Quantidade : art.Quantidade
      }
      jsonArtigos.push(jsonArt);
    });

    let json = {
      ID: this.opp.ID,
      Artigos : jsonArtigos
    }
    /*
    this.opportunitiesService.updateOpportunity(json).subscribe(
      data => { 
          console.log("updated");
      },
      err => {
          console.log(err);
      });
     */ 
  }

  getOpportunity(id){
    /*
    this.opportunitiesService.getOpportunity(id).subscribe(
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
      PrecoTotal : 26.32,
      Artigos : [
        {
          NomeArtigo : "Magro",
          IDArtigo: "A021",
          PrecoPorUnidade: 0.32,
          Quantidade: 1,
          Preco: 0.32
        },
        {
          NomeArtigo : "Artigo 2",
          IDArtigo: "A0002",
          PrecoPorUnidade: 13,
          Quantidade: 2,
          Preco: 26
        }
      ]
    };
  }
}
