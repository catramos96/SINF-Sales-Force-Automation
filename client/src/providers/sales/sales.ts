import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../../app/app-settings';
import 'rxjs/add/operator/map';

/*
  Generated class for the SalesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SalesProvider {

  constructor(public http: Http) {
    console.log('Hello SalesProvider Provider');
  }

  getSalesByDate(){
    var url = AppSettings.API_ENDPOINT+'docvendas';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
