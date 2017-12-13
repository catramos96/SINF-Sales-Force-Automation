import { Component ,ViewChild,
 ElementRef
} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AppointmentsProvider} from "../../../providers/appointments/appointments";
import { OpportunitiesPage } from '../../opportunities/opportunities';

@IonicPage()
@Component({
  selector: 'page-create-appointments-modal',
  templateUrl: 'create-appointments-modal.html',
})
export class CreateAppointmentsModalPage {

  private opportunityId;
  private tempName;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  public createAppointmentForm;
  private groups: JSON[] = [];
  public types = [];
  public priority = true;
  public startDate = new Date();
  public endDate = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appointmentsProvider: AppointmentsProvider,
              public formBuilder: FormBuilder) {

    this.getAppointmentsTypes();

    this.createAppointmentForm = formBuilder.group({
      TipoDeTarefa: [''],
      Prioridade: [''],
      Resumo: [''],
      Descricao: [''],
      DataInicio: this.startDate,
      DataFim: this.endDate,
      Localizacao: [''],
      IDUtilizador: [''],   //alterar pelo util
      Duracao: ['0'],
      IDTarefaOrigem: [''],
      IDContacto: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAppointmentsModalPage');
  }

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  getOpportunity(){
    this.navCtrl.push(OpportunitiesPage,
      {
        getApp: true,
        callback: this.getData
      });
  }

  getData = (Id,Nome) =>
  {
    return new Promise((resolve, reject) => { 
      this.opportunityId = Id;
      this.tempName = name;
      resolve();
    });
  };



  getAppointmentsTypes(){
    this.appointmentsProvider.getAllTypes().subscribe(
      data => {
        this.types = data;
      },
      err => {
        console.log(err);
      });
  }

  onSubmit(value: any): void {

    //this.nativeStorage.getItem("Id").then(
      //data =>{

        if (this.createAppointmentForm.valid) {
          var tmpPriority = 0;

          if(this.priority == true)
            tmpPriority = 1;


          var dataSend = {
            "TipoDeTarefa":this.createAppointmentForm.value.TipoDeTarefa,
              "Prioridade":tmpPriority,
              "Resumo":this.createAppointmentForm.value.Resumo,
              "Descricao":this.createAppointmentForm.value.Descricao,
              "DataInicio":this.createAppointmentForm.value.DataInicio,
              "DataFim":this.createAppointmentForm.value.DataFim,
              "Localizacao":this.createAppointmentForm.value.Localizacao,
              "IDUtilizador":this.createAppointmentForm.value.IDUtilizador,
              "Duracao":this.createAppointmentForm.value.Duracao,
              "IDTarefaOrigem":this.createAppointmentForm.value.IDTarefaOrigem,
              "IDContacto":this.createAppointmentForm.value.IDContacto,
        }

        console.log(dataSend);
          this.appointmentsProvider.postAppointment(dataSend).subscribe(
            data => {
              this.navCtrl.pop();
              alert("Success creating Appointment!");
            },
            err => {
              alert("Error creating Appointment!");
            });


        }


     // }
    //  );
  }

}
