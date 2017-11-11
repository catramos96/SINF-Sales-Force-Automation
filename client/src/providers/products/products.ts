import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../../app/app-settings';
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
    var url = AppSettings.API_ENDPOINT+'familias';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getSubcategories(categoryID){
    var url = AppSettings.API_ENDPOINT+'subfamilias/'+encodeURI(categoryID);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getProductSpecification(productID) {
    var url = AppSettings.API_ENDPOINT+'artigos/'+encodeURI(productID);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getProducts(familia,subfamilia) {
    var url = AppSettings.API_ENDPOINT+'artigos/subfamilias/'+encodeURI(familia)+'/'+encodeURI(subfamilia);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  searchCategory(name) {
    var url = AppSettings.API_ENDPOINT+'familias/search/'+encodeURI(name);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  searchProduct(name) {
    var url = AppSettings.API_ENDPOINT+'artigos/search/'+encodeURI(name);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }
}
