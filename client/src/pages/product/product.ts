import { Component } from '@angular/core';
import { ModalController, NavController} from 'ionic-angular';
import { ModalContentPage } from '../product/productModal';
import { ProductsProvider } from '../../providers/products/products';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {
  shownGroup = null;
  categories = [];
  subCategories = [];

  //categoryProducts = [];
  products = [];

  currentSelected = -1;

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
      this.subCategories = this.productService.getSubcategories(category);
      this.shownGroup = group;
    }
    this.currentSelected=-1;
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  onItemClicked(j,category,subcategory){
    this.products = this.productService.getProducts(category,subcategory);
    this.displayProducts();
    this.currentSelected = j;
  }

  displayProducts(){
    var colsLength = 2;
    var totalLength = this.products.length;
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
          cols.push(this.products[c]);
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
    if(name !== "") this.products = this.productService.searchProduct(name);
    else this.products = [];
    this.displayProducts();
  }

  onCancel(ev){
    this.categories = this.productService.getCategories();
    this.products = [];
    this.displayProducts();
  }

}