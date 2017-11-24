import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app-settings';


@Injectable()
export class ContactsProvider {

  constructor(public http:Http) {

  }

  public getAllContacts(){
    var url = AppSettings.API_ENDPOINT + 'contactos';
    return this.http.get(url).map(res => res.json());
  }

  public getAllClients(){
    var url = AppSettings.API_ENDPOINT + 'clientes';
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

  public searchClient(nameCliente:string){
    var url = AppSettings.API_ENDPOINT + 'clientes/search/' + nameCliente;
    return this.http.get(url).map(res => res.json());
  }

  public searchContact(nameContacto:string){
    var url = AppSettings.API_ENDPOINT + 'contactos/search/' + nameContacto;
    return this.http.get(url).map(res => res.json());
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
