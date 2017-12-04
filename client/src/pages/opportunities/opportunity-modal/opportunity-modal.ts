import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
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
    ID : "",Oportunidade: "",IdCliente:"",NomeCliente : "",ContactoCliente : "", Descricao : "",
    Resumo : "", DataCriacao : "",Vendedor: "",ValorTotalOV: 0, EstadoVenda: 0,propostas:[]
  };
  dataID = -1;
  shownGroup = null;
  currentSelected = -1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private opportunitiesService: OpportunitiesProvider,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController
  ) {
      let id = this.navParams.get('opportunityID');
      this.getOpportunity(id);  
  }

  ionViewDidLoad() { }

  //modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

  //accordion
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
    this.currentSelected=-1;
  };
  onItemClicked(j){
    this.currentSelected = j;
  }

  //remove product from proposal - button
  removeProduct(productID, NumProposal)
  {
    var artigos = this.opp.propostas[NumProposal-1].Artigos;
    
    //encontrar artigo
    for(let j = 0; j < artigos.length; j++)
    {
      if(artigos[j].IdArtigo === productID)
      {
        this.opp.propostas[NumProposal-1].Valor -= artigos[j].PrecoVenda * artigos[j].Quantidade;
        this.opp.propostas[NumProposal-1].Valor.toFixed(2);
        artigos.splice(j, 1);
        break;
      }
    }
    this.opp.propostas[NumProposal-1].Artigos = artigos;    
  }
  //add product to proposal - button
  addProducts(NumProposal){
    this.navCtrl.push(ProductPage,
      {
        isOpportunity: true, 
        numproposal: NumProposal,
        callback: this.getData
      });
  } 
  //receive products form catalogue
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
            this.opp.propostas[NumProposal-1].Valor += data[i].PrecoVenda;
            this.opp.propostas[NumProposal-1].Valor.toFixed(2);
            hasElement = true;
          }
        });
        //add in case of the element is new
        if(!hasElement)
        {
          linhaAtual++;
          data[i].Linha = linhaAtual;
          this.opp.propostas[NumProposal-1].Artigos.push(data[i]);
          this.opp.propostas[NumProposal-1].Valor += data[i].PrecoVenda; 
          this.opp.propostas[NumProposal-1].Valor.toFixed(2);
        }
      }
      resolve();
    });
  };
  //add quantity to product - button
  addQuantity(productID,NumProposal)
  {
    var artigos = this.opp.propostas[NumProposal-1].Artigos;

    console.log("x");
    for(let i = 0; i < artigos.length; i++)
    {
      if(artigos[i].IdArtigo === productID)
      {
        let precoAtual: number = this.opp.propostas[NumProposal-1].Valor;
        precoAtual = Number(artigos[i].PrecoVenda) + Number(precoAtual);
        this.opp.propostas[NumProposal-1].Valor = precoAtual.toFixed(2);
        artigos[i].Quantidade += 1;
        break;
      }
    }
    this.opp.propostas[NumProposal-1].Artigos = artigos;
  }
  //remove quantity from product
  removeQuantity(productID,NumProposal)
  {
    let artigos = this.opp.propostas[NumProposal-1].Artigos;
    
    for(let i = 0; i < artigos.length; i++)
    {
      if(artigos[i].IdArtigo === productID && artigos[i].Quantidade > 0)
      {
        let precoAtual: number = this.opp.propostas[NumProposal-1].Valor;
        precoAtual =  Number(precoAtual) - Number(artigos[i].PrecoVenda); 
        this.opp.propostas[NumProposal-1].Valor = precoAtual.toFixed(2);
        artigos[i].Quantidade -= 1;
        break;
      }
    }
    this.opp.propostas[NumProposal-1].Artigos = artigos;
  }

  //TODO
  //add new proposal to opportunity - button
  addNewProposal(){
    
  }

  //problema -> cancela as 2
  //cancel changes from proposal 
  cancelProposal(NumProposal){
    this.getOpportunity(this.opp.ID);
  }

  //TODO server
  //save changed proposal
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
      ID: this.opp.ID,
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

  //make new order -> win opportunity
  makeOrder(NumProposal){
    let linhas = [];
    this.opp.propostas[NumProposal-1].Artigos.forEach(element => {
      var jsonLin = {
        CodArtigo: element.IdArtigo,
        //DescArtigo
        //IdCabecDoc
        Quantidade : element.Quantidade,
        //Unidade
        Desconto : "0", //TODO adicionar desconto 
        PrecoUnitario : element.PrecoVenda
        //TotalIliquido
        //TotalLiquido
      }
      linhas.push(jsonLin);
    });

    let json = {
      //id
      Entidade : this.opp.IdCliente,  //receber o cliente
      //NumDoc 
      //Data
      //TotalMerc
      //Serie
      LinhasDoc : linhas
    }
    this.opportunitiesService.makeOrder(json).subscribe(
      data => { 
        //TODO aparecer dialogo
        console.log("feito");
        let alert = this.alertCtrl.create({
          title: 'Sales Order',
          subTitle: 'Sale order created successfuly',
          buttons: ['Dismiss']
        });
        alert.present();
      },
      err => {
          console.log(err);
      });
  }

  //TODO
  //lost opportunity
  cancelOpportunity(){

  }

  //receive opportunity
  getOpportunity(id){
    /*
    this.opportunitiesService.getOpportunity(id).subscribe(
      data => { 
          this.opp = data;
          console.log(this.opp);
      },
      err => {
          console.log(err);
      });
    */
    this.opp = {
      ID : "1",
      Oportunidade: "OPP",
      IdCliente: "1",
      NomeCliente : "Antonio",
      ContactoCliente : "963852714",
      Descricao : "Encomenda de coisas",
      Resumo : "Lorem ipsum blablabla",
      DataCriacao : "13/9/2017",
      Vendedor: "1",
      ValorTotalOV : 26.32,
      EstadoVenda: 0,
      propostas: [
        {
          NumProposta: 1,
          Valor: 10,
          Artigos:[
              {
                Linha: 1,
                NomeArtigo : "Magro",
                IdArtigo: "A021",
                Quantidade: 1,
                PrecoVenda: 0.32,
                Unidade: "UN"
              },
              {
                Linha: 2,
                NomeArtigo : "Artigo 2",
                IdArtigo: "A0002",
                Quantidade: 2,
                PrecoVenda: 26,
                Unidade: "UN"
              }
          ]
        },
        {
          NumProposta: 2,
          Valor : 10,
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
        }
      ]
    };
  }
}
