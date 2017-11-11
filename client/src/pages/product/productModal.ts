import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, Slides, NavController} from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { SalesHistoryPage } from '../sales-history/sales-history';
import { ReserveStockPage } from '../reserve-stock/reserve-stock';
import { MakeOrderPage } from '../make-order/make-order';

@Component({
  selector: 'page-product',
  templateUrl: 'productModal.html'
})

export class ModalContentPage {
    product= {
      ID:"",
      Nome: "",
      UnidadeVenda: "",
      IVA: "",
      StockAtual: "",
      PrecoMedio: "",
      FamiliaNome: "",
      SubFamiliaNome: "",
      PrazoEntrega: "",
      Peso: "",
      Observacoes: "",
      QuantidadeReservada: ""
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

    goToReserveStock(){
      this.navCtrl.push(ReserveStockPage);
    }

    goToMakeOrder(){
      this.navCtrl.push(MakeOrderPage);
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
        UnidadeVenda: "UN",
        IVA: "20",
        StockAtual: "600",
        PrecoMedio: "0.50",
        FamiliaNome: "Leite",
        SubFamiliaNome: "Normal",
        PrazoEntrega: "15",
        Peso: "150",
        Observacoes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate elit eu cursus consequat. Duis in velit a nisi ullamcorper tincidunt eu eget justo. Duis a tortor eros. Duis ante leo, tincidunt et sagittis a, volutpat non turpis.",
        QuantidadeReservada: "120"
      };
      */
    }
  }