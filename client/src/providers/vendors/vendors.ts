import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app-settings';

@Injectable()
export class VendorsProvider {

  constructor(public http: Http) {

  }

  public login(data){
    var url = AppSettings.API_ENDPOINT + 'vendedores/login';
    return this.http.post(url,data);
  }

  public createVendor(data){
    var url = AppSettings.API_ENDPOINT + 'vendedores';
    return this.http.post(url,data);
  }

  public getChiefTeam(id:string){
    var url = AppSettings.API_ENDPOINT + 'vendedores/team/chefe/'+id;
    return this.http.get(url).map(res => res.json());
  }

  public getVendorTeam(id:string){
    var url = AppSettings.API_ENDPOINT + 'vendedores/team/vendedor/vendedores/'+id;
    return this.http.get(url).map(res => res.json());
  }

  public getVendorChief(id:string){
    var url = AppSettings.API_ENDPOINT + 'vendedores/team/vendedor/chefe/'+id;
    return this.http.get(url).map(res => res.json());
  }

}
