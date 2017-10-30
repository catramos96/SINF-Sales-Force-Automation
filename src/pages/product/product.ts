import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductService } from '../../services/rest/product-service';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {
  shownGroup = null;
  categories = [];
  categoryProducts = [];
  products = [];

  constructor(public navCtrl: NavController, private productService: ProductService) {

  }

  ngOnInit(): void {
    // todas as categorias
    this.categories = this.productService.getCategories();
  }

  toggleGroup(group,category) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.categoryProducts = this.productService.getProductsByCategory(category);
      this.displayProducts();
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  displayProducts(){
    var colsLength = 3;
    var totalLength = this.categoryProducts.length;
    var rowsLength = Math.round(totalLength/colsLength);
    var rows = [];
    var r,c,maxCol;
    for(r = 0; r < rowsLength; r++)
    {
      var cols = [];
      maxCol = (r+1)*colsLength;
      if(maxCol > totalLength)  maxCol = totalLength;
      for(c = r*colsLength; c < maxCol; c++)
        cols.push(this.categoryProducts[c]);
      rows.push({row: cols});
    }
    this.products = rows;
  }
}

