import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app-settings';


/*
  Generated class for the RoutesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoutesProvider {

  constructor(public http: Http) {
    console.log('Hello RoutesProvider Provider');
  }

  public getAllRoutes(){
    var url = AppSettings.API_ENDPOINT + 'routes';
    return this.http.get(url).map(res => res.json());
  }

  public getRoute(id:string){
    var url = AppSettings.API_ENDPOINT + 'routes/' + encodeURI(id);
    return this.http.get(url).map(res => res.json());
  }
}
