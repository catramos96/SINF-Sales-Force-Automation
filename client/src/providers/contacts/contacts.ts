import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app-settings';


@Injectable()
export class ContactsProvider {

  constructor(public http:Http) {

  }

  public getAllContactsOfVendor(data){
    var url = AppSettings.API_ENDPOINT + 'contactos/vendor/' + data;
    return this.http.get(url).map(res => res.json());
  }

  public getAllClientsOfVendor(data){
    var url = AppSettings.API_ENDPOINT + 'clientes/vendor/' + data;
    return this.http.get(url).map(res => res.json());
  }

  public getAllGroups(){
    var url = AppSettings.API_ENDPOINT + 'grupos';
    return this.http.get(url).map(res => res.json());
  }

  public getClientById(CodCliente:string){
    var url = AppSettings.API_ENDPOINT + 'clientes/' + CodCliente;
    return this.http.get(url).map(res => res.json());
  }

  public getContactById(IdContact:string){
    var url = AppSettings.API_ENDPOINT + 'contactos/' + IdContact;
    return this.http.get(url).map(res => res.json());
  }

  public searchClient(data){
    var url = AppSettings.API_ENDPOINT + 'clientes/search';
    return this.http.post(url, data).map(res => res.json());
  }

  public searchContact(data){
    var url = AppSettings.API_ENDPOINT + 'contactos/search';
    return this.http.post(url, data).map(res => res.json());
  }

  public postTarget(data){
    var url = AppSettings.API_ENDPOINT + 'contactos';
    return this.http.post(url,data);
  }

  public postGroup(data){
    var url = AppSettings.API_ENDPOINT + 'grupos';
    return this.http.post(url,data);
  }

  public postClient(data){
    var url = AppSettings.API_ENDPOINT + 'clientes';
    return this.http.post(url,data);
  }

  public editClient(data, CodCliente:string){
    var url = AppSettings.API_ENDPOINT + 'clientes/' + CodCliente;
    return this.http.post(url,data);
  }

  public editContact(data, IdContact:string){
    var url = AppSettings.API_ENDPOINT + 'contactos/' + IdContact;
    return this.http.post(url,data);
  }

}
