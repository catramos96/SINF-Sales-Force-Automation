import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { OpportunitiesProvider } from '../../../providers/opportunities/opportunities';
import { ProductPage } from '../../product/product';

/**
 * Generated class for the OpportunityDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-opportunity-details',
  templateUrl: 'opportunity-details.html',
})
export class OpportunityDetailsPage {

  opp = {
    ID: "", NomeOport: "", CodCliente: "", NomeCliente: "", ContactoCliente: "", Descricao: "",
    Resumo: "", DataCriacao: "", Vendedor: "",
    ValorTotalOV: 0, EstadoVenda: 0, propostas: []
  };
  dataID = -1;
  shownGroup = null;
  currentSelected = -1;
  IDreceived;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private opportunitiesService: OpportunitiesProvider,
    private alertCtrl: AlertController
  ) {
    this.IDreceived = this.navParams.get('opportunityID');
    this.getOpportunity(this.IDreceived);
  }

  ionViewDidLoad() { }

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
    this.currentSelected = -1;
  };
  onItemClicked(j) {
    this.currentSelected = j;
  }

  //remove product from proposal - button
  removeProduct(productID, NumProposal) {
    let dto = {
      IdOportunidade: this.opp.ID,
      NumProposta: NumProposal,
      IdArtigo: productID
    }
    this.opportunitiesService.removeProductOpportunity(dto).subscribe(
      data => {
        console.log("removed");
        this.getOpportunity(this.IDreceived);
      },
      err => {
        console.log(err);
      });
  }
  //add product to proposal - button
  addProducts(NumProposal) {
    this.navCtrl.push(ProductPage,
      {
        isOpportunity: true,
        numproposal: NumProposal,
        callback: this.getData
      });
  }
  //receive products form catalogue
  getData = (json, NumProposal) => {
    return new Promise((resolve, reject) => {
      let linhaAtual = this.opp.propostas[NumProposal - 1].Artigos.length;
      for (let i = 0; i < json.length; i++) {
        var hasElement = false;
        this.opp.propostas[0].Artigos.forEach(element => {
          //element to update
          if (element.IdArtigo === json[i].IdArtigo) {
            element.Quantidade += 1;
            hasElement = true;
          }
        });


        //add in case of the element is new
        if (!hasElement) {
          let dto = {
            IdOportunidade: this.opp.ID,
            NumProposta: NumProposal,
            IdArtigo: json[i].IdArtigo
          }
          this.opportunitiesService.addProductOpportunity(dto).subscribe(
            data => {
              console.log("added");
              this.getOpportunity(this.IDreceived);
            },
            err => {
              console.log(err);
            });
        }

      }
      resolve();
    });
  };
  //add quantity to product - button
  addQuantity(productID, NumProposal) {
    var artigos = this.opp.propostas[NumProposal - 1].Artigos;

    for (let i = 0; i < artigos.length; i++) {
      if (artigos[i].IdArtigo === productID) {
        artigos[i].Quantidade += 1;
        break;
      }
    }
    this.opp.propostas[NumProposal - 1].Artigos = artigos;
  }
  //remove quantity from product
  removeQuantity(productID, NumProposal) {
    let artigos = this.opp.propostas[NumProposal - 1].Artigos;

    for (let i = 0; i < artigos.length; i++) {
      if (artigos[i].IdArtigo === productID && artigos[i].Quantidade > 0) {
        artigos[i].Quantidade -= 1;
        break;
      }
    }
    this.opp.propostas[NumProposal - 1].Artigos = artigos;
  }

  //confirmar
  //add new proposal to opportunity - button
  addNewProposal() {
    this.opportunitiesService.addProposal(this.opp.ID).subscribe(
      data => {
        console.log("created");
        let alert = this.alertCtrl.create({
          title: 'Opportunity',
          subTitle: 'Proposal created successfuly',
          buttons: ['Dismiss']
        });
        alert.present();
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Opportunity',
          subTitle: err,
          buttons: ['Dismiss']
        });
        alert.present();
      });
  }

  //cancel changes from proposal 
  cancelProposal(NumProposal) {
    this.getOpportunity(this.opp.ID);
  }

  //save changed proposal
  saveProposal(NumProposal) {
    let json = {
      IdOportunidade: this.opp.ID,
      Proposta: this.opp.propostas[NumProposal - 1]
    };

    this.opportunitiesService.updateOpportunity(json).subscribe(
      data => {
        console.log("updated");
        this.getOpportunity(this.IDreceived);
      },
      err => {
        console.log(err);
      });

  }

  //make new order -> win opportunity
  makeOrder(NumProposal) {
    let linhas = [];
    this.opp.propostas[NumProposal - 1].Artigos.forEach(element => {

      //e preciso converter o desconto de valor para percentagem
      let desc = element.Desconto / element.PrecoVenda;

      var jsonLin = {
        CodArtigo: element.IdArtigo,
        //DescArtigo
        //IdCabecDoc
        Quantidade: element.Quantidade,
        //Unidade
        Desconto: desc,
        PrecoUnitario: element.PrecoVenda
        //TotalIliquido
        //TotalLiquido
      }
      linhas.push(jsonLin);
    });

    let json = {
      //id
      Entidade: this.opp.CodCliente,  //receber o cliente
      //NumDoc 
      //Data
      //TotalMerc
      //Serie
      LinhasDoc: linhas
    }
    this.opportunitiesService.makeOrder(json).subscribe(
      data => {
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

  //verificar
  //lost opportunity
  cancelOpportunity() {
    this.opportunitiesService.endOportunity(this.opp).subscribe(
      data => {
        console.log("feito");
        let alert = this.alertCtrl.create({
          title: 'Opportunity Cancelled',
          subTitle: 'The current opportunity was lost.',
          buttons: ['Dismiss']
        });
        alert.present();
        this.navCtrl.pop();
      },
      err => {
        console.log(err);
      });
  }

  //receive opportunity
  getOpportunity(id) {

    this.opportunitiesService.getOpportunity(id).subscribe(
      data => {
        this.opp = data;
        this.opp.ID = id;
        //compor datas
        let date : string = this.opp.DataCriacao;
        this.opp.DataCriacao = date.substring(0,10);
        //para cada artigo -> corrigir precos
        this.opp.propostas.forEach(proposta => {
          proposta.Artigos.forEach(elem => {
            elem.PrecoFinal = elem.PrecoFinal.toFixed(2);
            elem.PrecoVenda = elem.PrecoVenda.toFixed(2);
            elem.Margem = elem.Margem.toFixed(2);
            elem.Custo = elem.Custo.toFixed(2);
            elem.Desconto = elem.Desconto.toFixed(2);
          });
          proposta.Valor = proposta.Valor.toFixed(2);
          proposta.Margem = proposta.Margem.toFixed(2);
          proposta.Desconto = proposta.Desconto.toFixed(2);
        });
      },
      err => {
        console.log(err);
      });
    /*
      this.opp = {
        
        ID : "1",
        NomeOport: "OPP",
        NomeCliente : "Antonio",
        ContactoCliente : "963852714",
        Descricao : "Encomenda de coisas",
        Resumo : "Lorem ipsum blablabla",
        DataCriacao : "13/9/2017",
        Vendedor: "1",
        CodCliente: "1", 
        ValorTotalOV : 26.32,
        EstadoVenda: 0,
        propostas: [
          {
            NumProposta: 1,
            Desconto: 2,
            Valor: 10,
            Rentabilidade: 1,
            Margem: 0.2,
            Artigos:[
                {
                  Linha: 1,
                  IdArtigo: "A021",
                  NomeArtigo : "Magro",
                  Quantidade: 1,
                  Unidade: "UN",
                  Custo: 0.1,
                  PrecoVenda: 0.32,
                  Desconto : 0.02,
                  PrecoFinal :0.3,
                  Rentabilidade : 0,
                  Margem : 0,
                },
                {
                  Linha: 2,
                  NomeArtigo : "Artigo 2",
                  IdArtigo: "A0002",
                  Quantidade: 1,
                  Unidade: "UN",
                  Custo: 0.1,
                  PrecoVenda: 0.32,
                  Desconto : 0.02,
                  PrecoFinal :0.3,
                  Rentabilidade : 0,
                  Margem : 0,
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
      };*/
  }

}
