import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../../app/app-settings';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StatisticsProvider {
  private salesman: string;

  constructor(public http: Http, public nativeStorage: NativeStorage) {
    this.nativeStorage.getItem("Id").then(
      data => {
        this.salesman = data;
      });
  }

  public getSoldProductsNumber() {
    let year: number = (new Date()).getFullYear();  

    var url = AppSettings.API_ENDPOINT + 'docvendas/produtosvendidos/' + year;
    return this.http.get(url).map(res => res.json());
  }

  public getSoldProductsNumberHistory() {
    var url = AppSettings.API_ENDPOINT + 'docvendas/produtosvendidos_ano/';
    return this.http.get(url).map(res => res.json());
  }

  public getSoldProductsNumberHistoryBySalesman() {
    //let salesman: number = 2;

    var url = AppSettings.API_ENDPOINT + 'docvendas/produtosvendidos_ano/' + this.salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getSoldProductsNumberBySalesman() {
    let year: number = (new Date()).getFullYear();  
    //let salesman: number = 2;  

    var url = AppSettings.API_ENDPOINT + 'docvendas/produtosvendidos/' + year + '/' + this.salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getBilledMoneyNumberHistory() {
    var url = AppSettings.API_ENDPOINT + 'docvendas/dinheirofaturado_ano/';
    return this.http.get(url).map(res => res.json());
  }

  public getBilledMoneyNumberHistoryBySalesman() {
    //let salesman: number = 2;

    var url = AppSettings.API_ENDPOINT + 'docvendas/dinheirofaturado_ano/' + this.salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getBilledMoneyNumber() {
    let year: number = (new Date()).getFullYear();

    var url = AppSettings.API_ENDPOINT + 'docvendas/dinheirofaturado/' + year;
    return this.http.get(url).map(res => res.json());
  }

  public getBilledMoneyNumberBySalesman() {
    let year: number = (new Date()).getFullYear();
    //let salesman: number = 2;  

    var url = AppSettings.API_ENDPOINT + 'docvendas/dinheirofaturado/' + year + '/' + this.salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getTop5Products() {
    var url = AppSettings.API_ENDPOINT + 'docvendas/top5produtos/';
    return this.http.get(url).map(res => res.json());
  }

  public getTop5ProductsBySalesman() {
    //let salesman: number = 2;   

    var url = AppSettings.API_ENDPOINT + 'docvendas/top5produtos/' + this.salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getSoldProductsByCategory() {
    var url = AppSettings.API_ENDPOINT + 'docvendas/produtoscategoria/';
    return this.http.get(url).map(res => this.convertToPercentage(res.json()));
  }

  public getSoldProductsByCategoryBySalesman() {
    //let salesman: number = 2;

    var url = AppSettings.API_ENDPOINT + 'docvendas/produtoscategoria/' + this.salesman;
    return this.http.get(url).map(res => this.convertToPercentage(res.json()));
  }

  private convertToPercentage(response) {
    let i;
    let quantidadeTotal = 0;
    for (i = 0; i < response.length; i++) {
      quantidadeTotal = quantidadeTotal + response[i].Quantidade;
    }

    for (i = 0; i < response.length; i++) {
      var percentagem = (response[i].Quantidade * 100) / quantidadeTotal;
      response[i].Quantidade = percentagem.toFixed(2) + "%";
    }

    return response;
  }
}
