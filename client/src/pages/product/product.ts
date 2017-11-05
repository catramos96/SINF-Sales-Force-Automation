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
    //init
    this.getCategories();
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
    this.getCategories();
    this.products = [];
    this.displayProducts();
  }

  // ---- PROVIDERS ----

  getCategories(){
    this.categories = [
      { Nome: "Leite", ID: "A01"},
      { Nome: "Queijo", ID: "A02"},
      { Nome: "Manteiga", ID: "A03"},
      { Nome: "Iogurte", ID: "A04"}
    ];
    /*this.productService.getCategories().subscribe(
      data => { 
          this.categories = data;
      },
      err => {
          console.log(err);
      });*/
  }

  getSubCategories(categoryID){
    
    if(categoryID === null)
      this.subCategories = [];
    else if(categoryID === "A01")  {
      this.subCategories = [
        { Nome: "Normal", IDFamilia: categoryID, ID:"001"},
        { Nome: "Crianças", IDFamilia: categoryID,ID:"001"}
      ];
    }
    else if(categoryID === "A02")  {
      this.subCategories = [
        { Nome: "Mozzarela", IDFamilia: categoryID,ID:"001"},
        { Nome: "Parmesao", IDFamilia: categoryID,ID:"001"},
        { Nome: "Fetta", IDFamilia: categoryID,ID:"001"},
        { Nome: "Fresco" , IDFamilia: categoryID,ID:"001"}
      ];
    }
    else if(categoryID === "A03")  {
      this.subCategories = [
        { Nome: "Manteiga", IDFamilia: categoryID,ID:"001"},
        { Nome: "Margarina", IDFamilia: categoryID,ID:"001"}
      ];
    }
    else if(categoryID === "A04")  {
      this.subCategories = [
        { Nome: "Sólido", IDFamilia: categoryID,ID:"001"},
        { Nome: "Líquido", IDFamilia: categoryID,ID:"001"},
        { Nome: "Grego", IDFamilia: categoryID,ID:"001"}
      ];
    }
    
    /*
    this.productService.getSubcategories(categoryID).subscribe(
      data => { 
          this.subCategories = data;
      },
      err => {
          console.log(err);
      });
      */
  }

  getProducts(categoryID,subcategoryID){
    
    if(subcategoryID === null && categoryID == null)
      this.products = [];
    else if(categoryID == "A01" && subcategoryID === "001"){
      this.products = [
        {ID: "A021",Nome: "Magro",FamiliaNome:"Leite", SubFamiliaNome:"Normal",StockAtual:"500",PrecoMedio:"0.32"},
        {ID: "A022",Nome: "Meio-Gordo",FamiliaNome:"Leite", SubFamiliaNome:"Normal",StockAtual:"500",PrecoMedio:"0.32"},
        {ID: "A023",Nome: "Gordo",FamiliaNome:"Leite", SubFamiliaNome:"Normal",StockAtual:"500",PrecoMedio:"0.32"},
      ];
    }  
    else
      this.products = [
        {ID: "A024",Nome: "Outro 1",FamiliaNome:"Queijo", SubFamiliaNome:"Parmesao",StockAtual:"500",PrecoMedio:"0.32"},
        {ID: "A025",Nome: "Outro 2",FamiliaNome:"Queijo", SubFamiliaNome:"Parmesao",StockAtual:"500",PrecoMedio:"0.32"},
        {ID: "A026",Nome: "Outro 3",FamiliaNome:"Queijo", SubFamiliaNome:"Parmesao",StockAtual:"500",PrecoMedio:"0.32"},
        {ID: "A027",Nome: "Outro 4",FamiliaNome:"Queijo", SubFamiliaNome:"Parmesao",StockAtual:"500",PrecoMedio:"0.32"},
        {ID: "A028",Nome: "Outro 5",FamiliaNome:"Queijo", SubFamiliaNome:"Parmesao",StockAtual:"500",PrecoMedio:"0.32"},
      ];
     
    
    var subfamilia = categoryID+"."+subcategoryID;
    console.log(subfamilia);  
    /*
    this.productService.getProducts(subfamilia).subscribe(
      data => { 
        this.products = data;
      },
      err => {
        console.log(err);
      });
    */
    this.displayProducts();
  }

}