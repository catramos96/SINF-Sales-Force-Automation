import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http:Http) {

  }

  getCategories() {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/
    return [
      { category: "Yogurt xpto 54" /*, list: ["1111","22222"]*/ },
      { category: "Yogurt llksc ss" /*, list: ["gggg","jjjjj","kkkk"]*/},
      { category: "Yogurt asf fdff" /*, list:["123","321","322","411"] */},
      { category: "Yogurt cgghbv 552" /*, list: ["eeeeeee","eeeeeeeeee","eeeeee","eeee"]*/},
      { category: "Yogurt aabbfff" /*, list: ["1","2","3","4"]*/}
    ];
  }

  getProductsByCategory(categoryName) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/

    if(categoryName === null)
      return [];
    
    if(categoryName === "Yogurt xpto 54"){
      return [
        {name: "1111",description: "hello"},
        {name: "22222",description: "hi"},
      ];
    }  

    return [
      {name: "gggg",description: "none"},
      {name: "jjjjj",description: "none"},
      {name: "kkkk",description: "none"},
      {name: "llll",description: "none"},
      {name: "hhhhh",description: "none"},
    ];
  }

  searchProducts(productName) {
    /*var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;*/
  }

}
