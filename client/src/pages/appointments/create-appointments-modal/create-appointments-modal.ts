import {
  Component, ViewChild,
  ElementRef
} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentsProvider } from "../../../providers/appointments/appointments";
import { OpportunitiesPage } from '../../opportunities/opportunities';
import { ClientPage } from '../../contacts/client/client';
import { TargetPage } from '../../contacts/target/target';
import {OpportunitiesProvider} from "../../../providers/opportunities/opportunities";

@IonicPage()
@Component({
  selector: 'page-create-appointments-modal',
  templateUrl: 'create-appointments-modal.html',
})
export class CreateAppointmentsModalPage {

  //callbacks
  private opportunityId;
  private contactId;
  private tempNameOpp;
  private tempNameCli;

  public createAppointmentForm;
  private groups: JSON[] = [];
  public types = [{ Descricao: "", ID: "" }];
  public priority = true;

  public edit = false;

  public ID="";

  public textButton = "Create";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public appointmentsProvider: AppointmentsProvider,
    public formBuilder: FormBuilder, public toastCtrl: ToastController) {

    this.getAppointmentsTypes();

    this.ID = this.navParams.get('ID');

    this.createAppointmentForm = formBuilder.group({
      TipoDeTarefa: [''],
      Prioridade: [''],
      Resumo: [''],
      Descricao: [''],
      DataInicio: new Date(),
      DataFim: new Date(),
      Localizacao: [''],
      IDUtilizador: [''],   //alterar pelo util
      Duracao: ['0'],
      IDTarefaOrigem: [''],
      IDContacto: ['']
    });

    if(this.ID != ""){
      this.appointmentsProvider.getAppointment(this.ID).subscribe(
        data => {
          var appointment = data;

          this.edit = true;

          if(data.Prioridade == 1)
            this.priority = true;
          else
            this.priority = false;

          this.createAppointmentForm.TipoDeTarefa = data.TipoDeTarefa;
          this.createAppointmentForm.Prioridade = data.Prioridade;
          this.createAppointmentForm.Resumo = data.Resumo;
          this.createAppointmentForm.Descricao = data.Descricao;
          this.createAppointmentForm.DataInicio = data.DataInicio;
          this.createAppointmentForm.DataFim = data.DataFim;
          this.createAppointmentForm.Localizacao = data.Localizacao;
          this.createAppointmentForm.IDTarefaOrigem = data.IDTarefaOrigem;
          this.createAppointmentForm.IDContacto = data.IDContacto;

          this.textButton = "Edit";
        },
        err => {

        }
      );

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAppointmentsModalPage');
  }

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  getOpportunity() {
    this.navCtrl.push(OpportunitiesPage,
      {
        isApp: true,
        callback: this.retOpportunity
      });
  }

  retOpportunity = (Id, Nome) => {
    return new Promise((resolve, reject) => {
      this.opportunityId = Id;
      this.tempNameOpp = Nome;
      resolve();
    });
  };

  getClient() {
    this.navCtrl.push(ClientPage,
      {
        isOpportunity: true,
        callback: this.retContact
      });
  }

  getTarget() {
    this.navCtrl.push(TargetPage,
      {
        isOpportunity: true,
        callback: this.retContact
      });
  }

  retContact = (Nome, Id) => {
    return new Promise((resolve, reject) => {
      this.contactId = Id;
      this.tempNameCli = Nome;
      resolve();
    });
  };

  getAppointmentsTypes() {
    this.appointmentsProvider.getAllTypes().subscribe(
      data => {
        this.types = data;
      },
      err => {
        console.log(err);
      });
  }

  onSubmit(value: any): void {

    if (this.createAppointmentForm.valid) {
      var tmpPriority = 0;

      if (this.priority == true)
        tmpPriority = 1;

      var typeId;
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i].Descricao == this.createAppointmentForm.value.TipoDeTarefa) {
          typeId = this.types[i].ID;
          break;
        }
      }
      var dataSend;

      if(!this.edit){
        dataSend = {
          "IdTipo": typeId,
          "TipoDeTarefa": this.createAppointmentForm.value.TipoDeTarefa,
          "Prioridade": tmpPriority,
          "Resumo": this.createAppointmentForm.value.Resumo,
          "Descricao": this.createAppointmentForm.value.Descricao,
          "DataInicio": this.createAppointmentForm.value.DataInicio,
          "DataFim": this.createAppointmentForm.value.DataFim,
          "Localizacao": this.createAppointmentForm.value.Localizacao,
          "IDUtilizador": this.contactId,
          "Duracao": this.createAppointmentForm.value.Duracao,
          "IDTarefaOrigem": this.opportunityId,
          "IDContacto": this.createAppointmentForm.value.IDContacto,
        }
      }
      else{
        dataSend = {
          "ID" : this.ID,
          "IdTipo": typeId,
          "TipoDeTarefa": this.createAppointmentForm.value.TipoDeTarefa,
          "Prioridade": tmpPriority,
          "Resumo": this.createAppointmentForm.value.Resumo,
          "Descricao": this.createAppointmentForm.value.Descricao,
          "DataInicio": this.createAppointmentForm.value.DataInicio,
          "DataFim": this.createAppointmentForm.value.DataFim,
          "Localizacao": this.createAppointmentForm.value.Localizacao,
          "IDUtilizador": this.contactId,
          "Duracao": this.createAppointmentForm.value.Duracao,
          "IDTarefaOrigem": this.opportunityId,
          "IDContacto": this.createAppointmentForm.value.IDContacto,
        }
      }

      var sendRequest = true;
      var message = "";
      if(dataSend.IdTipo == ""){
        message += "The appointment must have a type!\n";
        sendRequest = false;
      }
      if(dataSend.Resumo == ""){
          message += "The appointment must have a title!\n";
          sendRequest = false;
      }
      if(dataSend.DataInicio >= dataSend.DataFim) {
        message += "Start time can't be after or equal the end time!\n";
        sendRequest = false;
      }

      if(sendRequest){
        console.log(dataSend);

        if(!this.edit){
          this.appointmentsProvider.postAppointment(dataSend).subscribe(
            data => {
              this.navCtrl.pop();
              this.notification("Success creating Appointment!");
            },
            err => {
              this.notification("Error creating Appointment!");
            });
        }
        else{
          this.appointmentsProvider.updateAppointment(dataSend).subscribe(
            data => {
              this.navCtrl.pop();
              this.notification("Success editing Appointment!");
            },
            err => {
              this.notification("Error editing Appointment!");
            });
        }

      }
      else
        this.notification(message);
    }
  }

  notification(message){
      let toast = this.toastCtrl.create({
        message: message,
        duration: 5000,
        showCloseButton: true,
        position: 'top'
      });
      toast.present();
  }

}
