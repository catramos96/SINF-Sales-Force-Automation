import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  constructor(public http: Http) {
    console.log('Hello ProductsProvider Provider');
  }

  getCategories() {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return [
      { category: "Leite"},
      { category: "Queijo"},
      { category: "Manteiga"},
      { category: "Iogurte"}
    ];
  }

  getSubcategories(categoryName){
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    if(categoryName === null)
      return [];

    if(categoryName === "Leite")  {
      return [
        { subcategory: "Normal", category: categoryName},
        { subcategory: "Crianças", category: categoryName}
      ];
    }

    if(categoryName === "Queijo")  {
      return [
        { subcategory: "Mozzarela", category: categoryName},
        { subcategory: "Parmesao", category: categoryName},
        { subcategory: "Fetta", category: categoryName},
        { subcategory: "Fresco" , category: categoryName}
      ];
    }

    if(categoryName === "Manteiga")  {
      return [
        { subcategory: "Manteiga", category: categoryName},
        { subcategory: "Margarina", category: categoryName}
      ];
    }

    if(categoryName === "Iogurte")  {
      return [
        { subcategory: "Sólido", category: categoryName},
        { subcategory: "Líquido", category: categoryName},
        { subcategory: "Grego", category: categoryName}
      ];
    }
  }

  getProducts(categoryName, subCategoryName) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    if(subCategoryName === null && categoryName == null)
      return [];
    
    if(categoryName == "Leite" && subCategoryName === "Normal"){
      return [
        {name: "Magro",category: categoryName,subCategory: subCategoryName,price: "0.32", units:"500"},
        {name: "Meio-Gordo",category: categoryName,subCategory: subCategoryName,price: "0.32", units:"500"},
        {name: "Gordo",category: categoryName,subCategory: subCategoryName,price: "0.32", units:"500"},
      ];
    }  

    return [
      {name: "Nome 1",category: categoryName,subCategory: subCategoryName,price: "0.32", units:"500"},
      {name: "Nome 2",category: categoryName,subCategory: subCategoryName,price: "0.32", units:"500"},
      {name: "Nome 3",category: categoryName,subCategory: subCategoryName,price: "0.32", units:"500"},
      {name: "Nome 4",category: categoryName,subCategory: subCategoryName,price: "0.32", units:"500"},
      {name: "Nome 5",category: categoryName,subCategory: subCategoryName,price: "0.32", units:"500"},
    ];
  }

  getProductByName(productName) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return {
      name: "Magro",
      id:"A001",
      category: "Leite",
      subCategory: "Normal",
      price: "0.32", 
      units:"500",
      weight: "150",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate elit eu cursus consequat. Duis in velit a nisi ullamcorper tincidunt eu eget justo. Duis a tortor eros. Duis ante leo, tincidunt et sagittis a, volutpat non turpis.",
      images: [
        {url: "assets/imgs/logo.png"},
        {url: "assets/imgs/logo.png"},
        {url: "assets/imgs/logo.png"}
      ]
    };
  }

  searchProduct(name) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return [
      {name: "Magro",category: "Leite",subCategory: "Normal",price: "0.32", units:"500"},
    ];
  }

  searchCategory(name) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return [{ category: "Leite"}];
  }
}
