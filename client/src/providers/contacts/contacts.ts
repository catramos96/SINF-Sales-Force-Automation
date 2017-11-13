import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactsProvider {

  constructor(public http:Http) {

  }

  public getAllContacts(){
    var url = 'http://25.34.60.99:9608/api/contactos';
    return this.http.get(url).map(res => res.json());
  }

  public postTarget(data){
    var url = 'http://25.34.60.99:9608/api/contactos';
    return this.http.post(url,data);
  }

}
