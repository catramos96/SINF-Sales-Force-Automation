import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactsProvider {

  constructor(public http:Http) {

  }

  public getAllClients(){
    var url = 'http://192.168.56.56:9608/api/clientes';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
