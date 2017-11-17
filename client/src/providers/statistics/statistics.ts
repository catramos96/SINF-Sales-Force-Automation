import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StatisticsProvider {

  private url = 'http://25.34.60.99:9608/';

  constructor(public http: Http) {

  }

  public getSoldProductsNumber() {
    let year: number = 2016;  //O objectivo era ser para o ano corrente, mas no Primavera não estão adicionados dados de 2017

    var url = this.url + 'api/docvendas/produtosvendidos/' + year;
    return this.http.get(url).map(res => res.json());
  }

  public getSoldProductsNumberBySalesman() {
    let year: number = 2016;  //O objectivo era ser para o ano corrente, mas no Primavera não estão adicionados dados de 2017
    let salesman: number = 2;   //Ainda não existe sistema de login, por isso para já é sempre para o vendedor2

    var url = this.url + 'api/docvendas/produtosvendidos/' + year + '/' + salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getBilledMoneyNumber() {
    let year: number = 2016;  //O objectivo era ser para o ano corrente, mas no Primavera não estão adicionados dados de 2017

    var url = this.url + 'api/docvendas/dinheirofaturado/' + year;
    return this.http.get(url).map(res => res.json());
  }

  public getBilledMoneyNumberBySalesman() {
    let year: number = 2016;  //O objectivo era ser para o ano corrente, mas no Primavera não estão adicionados dados de 2017
    let salesman: number = 2;   //Ainda não existe sistema de login, por isso para já é sempre para o vendedor2

    var url = this.url + 'api/docvendas/dinheirofaturado/' + year + '/' + salesman;
    return this.http.get(url).map(res => res.json());
  }

  public getTop5Products() {
    var url = this.url + 'api/docvendas/top5produtos/';
    return this.http.get(url).map(res => res.json());
  }

  public getTop5ProductsBySalesman() {
    let salesman: number = 2;   //Ainda não existe sistema de login, por isso para já é sempre para o vendedor2

    var url = this.url + 'api/docvendas/top5produtos/' + salesman;
    return this.http.get(url).map(res => res.json());
  }
}
