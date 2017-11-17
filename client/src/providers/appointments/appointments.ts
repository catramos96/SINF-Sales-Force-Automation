import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../../app/app-settings';
import 'rxjs/add/operator/map';


@Injectable()
export class AppointmentsProvider {

  constructor(public http:Http) {
    console.log("Hello from appointmentsProvider");
  }

  public getAllAppointments(){
    var url = AppSettings.API_ENDPOINT + 'tarefas';
    return this.http.get(url).map(res => res.json());
  }

  public getAppointment(codApp){
    var url = AppSettings.API_ENDPOINT + 'tarefas/' + encodeURI(codApp);
    return this.http.get(url).map(res => res.json());
  }

  public  getAppointmentsInRange(d1:Date,d2:Date){
    var url = AppSettings.API_ENDPOINT + 'tarefas/rangeTarefas/' + encodeURI(d1.toDateString()) + '/' + encodeURI(d2.toDateString());
    return this.http.get(url).map(res => res.json());
  }

}