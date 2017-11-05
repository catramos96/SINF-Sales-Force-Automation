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
      let name = this.params.get('productName');
      this.product = this.productService.getProductByName(name);      
    }
  
    @ViewChild(Slides) slides: Slides;
    
      goToSlide() {
        this.slides.slideTo(2, 500);
      }

    dismiss() {
      this.viewCtrl.dismiss();
    }
  }