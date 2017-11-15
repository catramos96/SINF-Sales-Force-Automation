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
    Lead: {ID : "",Oportunidade: "",NomeCliente : "",ContactoCliente : "", Descricao : "",
    Resumo : "", DataCriacao : "",Vendedor: ""}, 
    ValorTotalOV: 0, EstadoVenda: 0,propostas:[]
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

  removeProduct(productID, NumProposal)
  {
    var artigos = this.opp.propostas[NumProposal-1].Artigos;
    
    //encontrar artigo
    for(let j = 0; j < artigos.length; j++)
    {
      if(artigos[j].IdArtigo === productID){
        //this.opp.propostas[NumProposal-1].PrecoTotal -= artigos[j].PrecoVenda * artigos[j].Quantidade; //TODO compor
        artigos.splice(j, 1);
        break;
      }
    }
    this.opp.propostas[NumProposal-1].Artigos = artigos;    
  }

  addProducts(NumProposal){
    this.navCtrl.push(ProductPage,
      {
        isOpportunity: true, 
        numproposal: NumProposal,
        callback: this.getData
      });
  } 

  getData = (data,NumProposal) =>
  {
    return new Promise((resolve, reject) => {

      let linhaAtual = this.opp.propostas[NumProposal-1].Artigos.length;

      for(let i = 0; i < data.length; i++)
      {
        var hasElement = false;
        this.opp.propostas[0].Artigos.forEach( element => { 
          if(element.IdArtigo === data[i].IdArtigo){
            element.Quantidade += 1;
            //this.opp.propostas[NumProposal-1].PrecoTotal += artigos[j].PrecoVenda; //TODO compor
            hasElement = true;
          }
        });
        //add in case of the element is new
        if(!hasElement)
        {
          linhaAtual++;
          data[i].Linha = linhaAtual;
          this.opp.propostas[NumProposal-1].Artigos.push(data[i]);
          //this.opp.propostas[NumProposal-1].PrecoTotal += artigos[j].PrecoVenda; //TODO compor
        }
      }
      resolve();
    });
  };

  addQuantity(productID,NumProposal)
  {
    var artigos = this.opp.propostas[NumProposal-1].Artigos;

    for(let i = 0; i < artigos.length; i++)
    {
      if(artigos[i].IdArtigo === productID){
        //this.opp.propostas[NumProposal-1].PrecoTotal -= artigos[j].PrecoVenda; //TODO compor
        artigos[i].Quantidade += 1;
        break;
      }
    }
    this.opp.propostas[NumProposal-1].Artigos = artigos;
  }

  removeQuantity(productID,NumProposal)
  {
    let artigos = this.opp.propostas[NumProposal-1].Artigos;
    
    for(let i = 0; i < artigos.length; i++)
    {
      if(artigos[i].IdArtigo === productID){
        //this.opp.propostas[NumProposal-1].PrecoTotal -= artigos[j].PrecoVenda; //TODO compor
        if(artigos[i].Quantidade > 0)
          artigos[i].Quantidade -= 1;
        break;
      }
    }
    this.opp.propostas[NumProposal-1].Artigos = artigos;
  }

  //problema -> cancela as 2
  cancelProposal(NumProposal){
    this.getOpportunity(this.opp.Lead.ID);
  }

  //TODO -> fazer no server (depois de 6ª)
  saveProposal(NumProposal){
    let jsonArtigos = [];

    this.opp.propostas[NumProposal-1].Artigos.forEach(art => {
      let jsonArt ={
        IDArtigo : art.IDArtigo,
        Quantidade : art.Quantidade
      }
      jsonArtigos.push(jsonArt);
    });

    let json = {
      ID: this.opp.Lead.ID,
      NumProposal: NumProposal,
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
    
    this.opportunitiesService.getOpportunity(id).subscribe(
      data => { 
          this.opp = data;
          console.log(this.opp);
      },
      err => {
          console.log(err);
      });
    /*
    this.opp = {
      Lead : {
        ID : "1",
        Oportunidade: "OPP",
        NomeCliente : "Antonio",
        ContactoCliente : "963852714",
        Descricao : "Encomenda de coisas",
        Resumo : "Lorem ipsum blablabla",
        DataCriacao : "13/9/2017",
        Vendedor: "1"
      }, 
      ValorTotalOV : 26.32,
      EstadoVenda: 0,
      propostas: [
        {
          NumProposta: 1,
          Artigos:[
              {
                Linha: 1,
                NomeArtigo : "Magro",
                IDArtigo: "A021",
                Quantidade: 1,
                PrecoVenda: 0.32,
                Unidade: "UN"
              },
              {
                Linha: 2,
                NomeArtigo : "Artigo 2",
                IDArtigo: "A0002",
                Quantidade: 2,
                PrecoVenda: 26,
                Unidade: "UN"
              }
          ]
        },
      ]
    };
    */
  }
}
