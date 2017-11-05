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
    var url = 'http://endereco:porta/api/familias';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getSubcategories(categoryID){
    var url = 'http://endereco:porta/api/subfamilias/'+encodeURI(categoryID);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getProductSpecification(productID) {
    var url = 'http://endereco:porta/api/artigos/'+encodeURI(productID);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  //COMPOR ESTE
  getProducts(subfamilia) {
    var url = 'http://endereco:porta/api/artigos/'+encodeURI(subfamilia);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  //TERMINAR
  searchProduct(name) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return [
      {name: "Magro",category: "Leite",subCategory: "Normal",price: "0.32", units:"500"},
    ];
  }

  //TERMINAR
  searchCategory(name) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    return [{ category: "Leite"}];
  }
}
