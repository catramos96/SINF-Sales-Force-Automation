import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAppointmentsModalPage } from './create-appointments-modal';

@NgModule({
  declarations: [
    CreateAppointmentsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAppointmentsModalPage),
  ],
})
export class CreateAppointmentsModalPageModule {}
