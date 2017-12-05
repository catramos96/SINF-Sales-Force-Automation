import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, Slides, NavController} from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { SalesHistoryPage } from '../sales-history/sales-history';

@Component({
  selector: 'page-product',
  templateUrl: 'productModal.html'
})

export class ModalContentPage {
    product= {
      ID:"", Nome: "", Marca: "", Observacoes: "", FamiliaNome: "", SubFamiliaNome: "",
      PrazoEntrega: "", UnidadeVenda: "", StockAtual: "", IVA: "", PVP1: "", Desconto: "", PrecoFinal: "",
    };
    imgSlides: Array<any> = [
      {
        url: 'assets/imgs/logo.png'
      },
      {
        url: 'assets/imgs/logo.png'
      },
      {
        url: 'assets/imgs/logo.png'
      }
    ];
  
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      private productService: ProductsProvider,
      private navCtrl: NavController
    ) {
      let name = this.params.get('productID');
      this.getProductSpecification(name);      
    }
  
    @ViewChild(Slides) slides: Slides;
    
    goToSlide() {
      this.slides.slideTo(2, 500);
    }

    dismiss() {
      this.viewCtrl.dismiss();
    }

    goToSalesHistory(){
      this.navCtrl.push(SalesHistoryPage);
    }

    // ---- provider ----

    getProductSpecification(productID){
      
      this.productService.getProductSpecification(productID).subscribe(
        data => { 
            this.product = data;
        },
        err => {
            console.log(err);
        });
      
      /*
      this.product = {
        ID:"A001",
        Nome: "Magro",
        Marca: "LB",
        Observacoes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate elit eu cursus consequat. Duis in velit a nisi ullamcorper tincidunt eu eget justo. Duis a tortor eros. Duis ante leo, tincidunt et sagittis a, volutpat non turpis.",
        FamiliaNome: "Leite",
        SubFamiliaNome: "Normal",
        PrazoEntrega: "15",
        UnidadeVenda: "UN",
        StockAtual: "600",
        IVA: "20",
        PVP1: "0.50",
        Desconto: "20",
        PrecoFinal: "",
      };
      */
    }
  }