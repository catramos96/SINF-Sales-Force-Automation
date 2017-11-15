import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../../app/app-settings';
import 'rxjs/add/operator/map';

/*
  Generated class for the OpportunitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OpportunitiesProvider {

  constructor(public http: Http) {
    console.log('Hello OpportunitiesProvider Provider');
  }

  //done
  getOpportunities(){
    var url = AppSettings.API_ENDPOINT+'opportunities';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  //done
  getOpportunity(name){
    var url = AppSettings.API_ENDPOINT+'opportunities/'+encodeURI(name);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  //FAZER
  updateOpportunity(opportunity){
    var url = AppSettings.API_ENDPOINT+'opportunities/update/'+encodeURI(opportunity.ID);
    var response = this.http.post(url,opportunity.Artigos).map(res => res.json());
    return response;
  }

}
