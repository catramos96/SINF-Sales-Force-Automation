import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StatisticsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StatisticsProvider {

  constructor(public http: Http) {
    console.log('Hello StatisticsProvider Provider');
  }

  public getSoldProductsNumber() {
    return 30;
  }

  public getSoldProductsNumberByYear(year) {
    return 50;
  }
}
