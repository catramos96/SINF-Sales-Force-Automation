import { Component } from '@angular/core';
import { ModalController, NavController} from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { ModalContentPage } from '../product/productModal';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {
  shownGroup = null;
  categories = [];
  categoryProducts = [];
  products = [];

  constructor(
    public navCtrl: NavController, 
    private productService: ProductsProvider,
    public modalCtrl : ModalController
  ) {

  }

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
  }

  openModal(productName) {
    let modal = this.modalCtrl.create(ModalContentPage,{ productName: productName });
    modal.present();
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
    var colsLength = 2;
    var totalLength = this.categoryProducts.length;
    var rowsLength = Math.round(totalLength/colsLength);
    var rows = [];
    var r,c,maxCol;
    for(r = 0; r < rowsLength; r++)
    {
      var cols = [];
      maxCol = (r+1)*colsLength;
      //if(maxCol > totalLength)  maxCol = totalLength;
      for(c = r*colsLength; c < maxCol; c++){
        if(c >= maxCol)
          cols.push(null);
        else
          cols.push(this.categoryProducts[c]);
      }
      rows.push({row: cols});
    }
    this.products = rows;
  }

  searchCategory(ev) {
    //init
    this.categories = this.productService.getCategories();    
    //search
    let name = ev.target.value;
    if(name !== "")
      this.categories = this.productService.searchCategory(name);
  }

  searchProduct(ev) {
    let name = ev.target.value;
    if(name !== "") this.categoryProducts = this.productService.searchProduct(name);
    else this.categoryProducts = [];
    this.displayProducts();
  }

  onCancel(ev){
    this.categories = this.productService.getCategories();
    this.categoryProducts = [];
    this.displayProducts();
  }

}