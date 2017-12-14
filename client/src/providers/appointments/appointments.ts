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

  public postAppointment(data){
    var url = AppSettings.API_ENDPOINT + 'tarefas';
    return this.http.post(url,data);
  }

  public  getAppointmentsInRange(d1:Date,d2:Date){
    var url = AppSettings.API_ENDPOINT + 'tarefas/rangeTarefas/' + encodeURI(d1.toDateString()) + '/' + encodeURI(d2.toDateString());
    return this.http.get(url).map(res => res.json());
  }

  public  updateAppointment(data){
    var url = AppSettings.API_ENDPOINT + 'tarefas/update';
    return this.http.post(url,data);
  }

  public  removeAppointment(id){
    var url = AppSettings.API_ENDPOINT + 'tarefas/remove/' + encodeURI(id);
    return this.http.post(url,"");
  }

  public getType(codTipo){
    var url = AppSettings.API_ENDPOINT + 'tipo_tarefa/' + encodeURI(codTipo);
    return this.http.get(url).map(res => res.json());
  }

  public getAllTypes(){
    var url = AppSettings.API_ENDPOINT + 'tipo_tarefa';
    return this.http.get(url).map(res => res.json());
  }

  public getAppointmentsByOpportunity(ID){
    var url = AppSettings.API_ENDPOINT + 'tarefas/oportunidade/'+encodeURI(ID);
    return this.http.get(url).map(res => res.json());
  }


}
