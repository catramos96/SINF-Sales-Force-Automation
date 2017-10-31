import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  constructor(public navCtrl: NavController) {


  }
}

