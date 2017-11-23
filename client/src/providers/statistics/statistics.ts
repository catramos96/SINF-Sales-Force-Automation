import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../../app/app-settings';
import 'rxjs/add/operator/map';

@Injectable()
export class StatisticsProvider {

  constructor(public http: Http) {

  }

  public getSoldProductsNumber() {
    let year: number = 2016;  //O objectivo era ser para o ano corrente, mas no Primavera não estão adicionados dados de 2017

    var url = AppSettings.API_ENDPOINT + 'docvendas/produtosvendidos/' + year;
    return this.http.get(url).map(res => res.json());
  }

  public getSoldProductsNumberBySalesman() {
    let year: number = 2016;  //O objectivo era ser para o ano corrente, mas no Primavera não estão adicionados dados de 2017
    let salesman: number = 2;   //Ainda não existe sistema de login, por isso para já é sempre para o vendedor2

    var url = AppSettings.API_ENDPOINT + 'docvendas/produtosvendidos/' + year + '/' + salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getBilledMoneyNumber() {
    let year: number = 2016;  //O objectivo era ser para o ano corrente, mas no Primavera não estão adicionados dados de 2017

    var url = AppSettings.API_ENDPOINT + 'docvendas/dinheirofaturado/' + year;
    return this.http.get(url).map(res => res.json());
  }

  public getBilledMoneyNumberBySalesman() {
    let year: number = 2016;  //O objectivo era ser para o ano corrente, mas no Primavera não estão adicionados dados de 2017
    let salesman: number = 2;   //Ainda não existe sistema de login, por isso para já é sempre para o vendedor2

    var url = AppSettings.API_ENDPOINT + 'docvendas/dinheirofaturado/' + year + '/' + salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getTop5Products() {
    var url = AppSettings.API_ENDPOINT + 'docvendas/top5produtos/';
    return this.http.get(url).map(res => res.json());
  }

  public getTop5ProductsBySalesman() {
    let salesman: number = 2;   //Ainda não existe sistema de login, por isso para já é sempre para o vendedor2

    var url = AppSettings.API_ENDPOINT + 'docvendas/top5produtos/' + salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getSoldProductsByCategory() {
    var url = AppSettings.API_ENDPOINT + 'docvendas/produtoscategoria/';
    return this.http.get(url).map(res => this.convertToPercentage(res.json()));
  }

  public getSoldProductsByCategoryBySalesman() {
    let salesman: number = 2;

    var url = AppSettings.API_ENDPOINT + 'docvendas/produtoscategoria/' +salesman;
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
      response[i].Quantidade = percentagem.toFixed(2);
    }

    return response;
  }
}
