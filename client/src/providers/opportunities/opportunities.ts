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
    var url = AppSettings.API_ENDPOINT+'oportunidades';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  //done
  getOpportunity(name){
    var url = AppSettings.API_ENDPOINT+'oportunidades/'+encodeURI(name);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  //done
  makeOrder(sale){
    var url = AppSettings.API_ENDPOINT+'docvendas';
    var response = this.http.post(url,sale).map(res => res.json());
    return response;
  }

  //done
  createOpportunity(opportunity){
    var url = AppSettings.API_ENDPOINT+'oportunidades';
    var response = this.http.post(url,opportunity).map(res => res.json());
    return response;
  }

  //done
  addProposal(oppID){
    var url = AppSettings.API_ENDPOINT+'oportunidades/proposta';
    var response = this.http.post(url,{"ID":oppID}).map(res => res.json());
    return response;
  }

  //verificar
  removeProductOpportunity(json){
    var url = AppSettings.API_ENDPOINT+'oportunidades/removeproduto/';
    var response = this.http.post(url,json).map(res => res.json());
    return response;
  }

  //verificar
  addProductOpportunity(json){
    var url = AppSettings.API_ENDPOINT+'oportunidades/adicionaproduto/';
    var response = this.http.post(url,json).map(res => res.json());
    return response;
  }

  //verificar
  updateOpportunity(ID,proposal){
    var url = AppSettings.API_ENDPOINT+'oportunidades/update/'+encodeURI(ID);
    var response = this.http.put(url,proposal).map(res => res.json());
    return response;
  }

  //verificar
  endOportunity(opportunity){
    var url = AppSettings.API_ENDPOINT+'oportunidades/perder';
    var response = this.http.post(url,opportunity).map(res => res.json());
    return response;
  }
}
