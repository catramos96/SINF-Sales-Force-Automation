import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ModalContentPage } from '../product/productModal';
import { ProductsProvider } from '../../providers/products/products';
import { Button } from 'ionic-angular/components/button/button';
import { OpportunityModalPage } from '../opportunities/opportunity-modal/opportunity-modal';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {
  shownGroup = null;
  categories = [];
  subCategories = [];
  products = [];
  currentSelected = -1;

  isOpportunity = false;
  callback = null;
  oppProducts = [];

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams,
    private productService: ProductsProvider,
    public modalCtrl : ModalController
  ) {

  }

  ionViewDidLoad(){
    this.isOpportunity = this.navParams.get('isOpportunity');
    this.callback = this.navParams.get('callback');

    this.getCategories();
  }

  openModal(productID) {
    let modal = this.modalCtrl.create(ModalContentPage,{ productID: productID });
    modal.present();
  }

  toggleGroup(group,categoryID) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.getSubCategories(categoryID);
      this.shownGroup = group;
    }
    this.currentSelected=-1;
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  onItemClicked(j,category,subcategory){
    this.getProducts(category,subcategory);
    this.currentSelected = j;
  }

  addProduct(prodID,prodName,prodPrice){
    if(this.isOpportunity)
    {
      /*let hasProd = false;
      for(let i = 0; i < this.oppProducts.length; i++){
        if(this.oppProducts[i].IDArtigo === prodID){
          this.oppProducts[i].Quantidade += 1;
          hasProd = true;
          break;
        }
      }
      if(!hasProd){
        */
        let json = {
          NomeArtigo : prodName,
          IDArtigo: prodID,
          PrecoPorUnidade: Number(prodPrice),
          Quantidade: Number(1),
          Preco: Number(prodPrice),
        };
        this.oppProducts.push(json);
      //}
      //event.currentTarget.disabled = true;
    }
  }

  sendProducts(){
    this.callback(this.oppProducts).then(()=>{ this.navCtrl.pop() });
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

  // ---- searchs ----

  searchCategory(ev) {
    let name = ev.target.value;
    if(name !== "") this.searchCategoryProvider(name);
    else  this.getCategories();
  }

  searchProduct(ev) {
    let name = ev.target.value;
    if(name !== "") this.searchProductProvider(name);
    else 
    {
      this.products = [];
      this.displayProducts();
    }
  }

  onCancel(ev){
    this.getCategories();
    //this.products = [];
    //this.displayProducts();
  }

  // ---- PROVIDERS ----

  getCategories(){
    /*
    this.productService.getCategories().subscribe(
      data => { 
          this.categories = data;
      },
      err => {
          console.log(err);
      });
    */
    this.categories = [
      { Nome: "Leite", ID: "A01"},
    ];
    
  }

  getSubCategories(categoryID){
    /*
    this.productService.getSubcategories(categoryID).subscribe(
      data => { 
          this.subCategories = data;
      },
      err => {
          console.log(err);
      });
    */
    if(categoryID === null)
      this.subCategories = [];
    else if(categoryID === "A01")  {
      this.subCategories = [
        { Nome: "Normal", IDFamilia: categoryID, ID:"001"},
      ];
    }

  }

  getProducts(categoryID,subcategoryID){
    /*
    this.productService.getProducts(categoryID,subcategoryID).subscribe(
      data => { 
        this.products = data;
        this.displayProducts();
      },
      err => {
        console.log(err);
      });
    */
    if(subcategoryID === null && categoryID == null)
      this.products = [];
    else
      this.products = [
        {ID: "A021",Nome: "Magro",FamiliaNome:"Leite", SubFamiliaNome:"Normal",StockAtual:"500",PrecoMedio:"0.32"},
        {ID: "A022",Nome: "Magro",FamiliaNome:"Leite", SubFamiliaNome:"Normal",StockAtual:"500",PrecoMedio:"0.32"}
      ];
    this.displayProducts();  
    
  }

  searchCategoryProvider(name){
    this.productService.searchCategory(name).subscribe(
      data => { 
        this.categories = data;
      },
      err => {
        console.log(err);
      });
  }

  searchProductProvider(name){
    this.productService.searchProduct(name).subscribe(
      data => { 
        this.products = data;
        this.displayProducts();
      },
      err => {
        console.log(err);
      });
  }

}