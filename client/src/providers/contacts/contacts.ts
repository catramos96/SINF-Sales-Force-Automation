import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactsProvider {

  private url = 'http://25.34.60.99:9608/';

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
    return this.http.put(url,data);
  }

}
