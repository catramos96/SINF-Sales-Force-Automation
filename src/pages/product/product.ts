import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductService } from '../../services/rest/product-service';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  constructor(public navCtrl: NavController) {

  }
}

