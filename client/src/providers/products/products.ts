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
      { category: "Yogurt xpto 54"},
      { category: "Yogurt llksc ss"},
      { category: "Yogurt asf fdff"},
      { category: "Yogurt cgghbv 552"},
      { category: "Yogurt aabbfff"}
    ];
  }

  searchProduct(name) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return [
      {name: "llll",category: "Yogurt llksc ss",price: "0.32", units:"200"},
      {name: "hhhhh",category: "Yogurt llksc ss",price: "0.32", units:"200"}
    ];
  }

  searchCategory(name) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return [{ category: "Yogurt xpto 54"}];
  }

  getProductsByCategory(categoryName) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    if(categoryName === null)
      return [];
    
    if(categoryName === "Yogurt xpto 54"){
      return [
        {name: "1111",category: "Yogurt xpto 54",price: "0.32", units:"200"},
        {name: "22222",category: "Yogurt xpto 54",price: "0.32", units:"200"},
      ];
    }  

    return [
      {name: "gggg",category: "Yogurt llksc ss",price: "0.32", units:"200"},
      {name: "jjjjj",category: "Yogurt llksc ss",price: "0.32", units:"200"},
      {name: "kkkk",category: "Yogurt llksc ss",price: "0.32", units:"200"},
      {name: "llll",category: "Yogurt llksc ss",price: "0.32", units:"200"},
      {name: "hhhhh",category: "Yogurt llksc ss",price: "0.32", units:"200"},
    ];
  }

  getProduct(productName) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return {
      name: "gggg",
      id:"xxx-xxx-xxx",
      category: "Yogurt llksc ss",
      price: "0.32", 
      units:"200",
      weight: "150",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate elit eu cursus consequat. Duis in velit a nisi ullamcorper tincidunt eu eget justo. Duis a tortor eros. Duis ante leo, tincidunt et sagittis a, volutpat non turpis.",
      images: [
        {url: "assets/imgs/logo.png"},
        {url: "assets/imgs/logo.png"},
        {url: "assets/imgs/logo.png"}
      ]
    };
  }
}
