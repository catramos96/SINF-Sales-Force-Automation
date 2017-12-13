import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAppointmentModalPage } from './view-appointment-modal';

@NgModule({
  declarations: [
    ViewAppointmentModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAppointmentModalPage),
  ],
})
export class ViewAppointmentModalPageModule {}
