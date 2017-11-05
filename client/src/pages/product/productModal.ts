import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, Slides} from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

@Component({
  selector: 'page-product',
  templateUrl: 'productModal.html'
})

export class ModalContentPage {
    product;
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
      private productService: ProductsProvider
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

    // ---- provider ----

    getProductSpecification(productID){
      /*
      this.productService.getProductSpecification(productID).subscribe(
      data => { 
          this.product = data;
      },
      err => {
          console.log(err);
      });
      */

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
  
    }
  }