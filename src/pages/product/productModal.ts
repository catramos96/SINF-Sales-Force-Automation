import { Component } from '@angular/core';
import { Platform, NavParams, ViewController} from 'ionic-angular';
import { ProductService } from '../../services/rest/product-service';

@Component({
  templateUrl: 'productModal.html'
})

export class ModalContentPage {
    product;
  
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      private productService: ProductService
    ) {
      let name = this.params.get('productName');
      this.product = this.productService.getProduct(name);
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }
  }