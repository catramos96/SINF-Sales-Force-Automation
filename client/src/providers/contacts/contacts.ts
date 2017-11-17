import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactsProvider {

  private url = 'http://192.168.1.3:9608/';

  constructor(public http:Http) {

  }

  public getAllContacts(){
    var url = this.url + 'api/contactos';
    return this.http.get(url).map(res => res.json());
  }

  public getAllClients(){
    var url = this.url + 'api/clientes';
    return this.http.get(url).map(res => res.json());
  }

  public getAllGroups(){
    var url = this.url + 'api/grupos';
    return this.http.get(url).map(res => res.json());
  }

  public getClientById(CodCliente:string){
    var url = this.url + 'api/clientes/' + CodCliente;
    return this.http.get(url).map(res => res.json());
  }

  public getContactById(IdContact:string){
    var url = this.url + 'api/contactos/' + IdContact;
    return this.http.get(url).map(res => res.json());
  }

  public searchClient(nameCliente:string){
    var url = this.url + 'api/clientes/search/' + nameCliente;
    return this.http.get(url).map(res => res.json());
  }

  public searchContact(nameContacto:string){
    var url = this.url + 'api/contactos/search/' + nameContacto;
    return this.http.get(url).map(res => res.json());
  }

  public postTarget(data){
    var url = this.url + 'api/contactos';
    return this.http.post(url,data);
  }

  public postGroup(data){
    var url = this.url + 'api/grupos';
    return this.http.post(url,data);
  }

  public postClient(data){
    var url = this.url + 'api/clientes';
    return this.http.post(url,data);
  }

  public editClient(data, CodCliente:string){
    var url = this.url + 'api/clientes/' + CodCliente;
    return this.http.post(url,data);
  }

  public editContact(data, IdContact:string){
    var url = this.url + 'api/contactos/' + IdContact;
    return this.http.post(url,data);
  }

}
