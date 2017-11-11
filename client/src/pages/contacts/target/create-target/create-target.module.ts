import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTargetPage } from './create-target';

@NgModule({
  declarations: [
    CreateTargetPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTargetPage),
  ],
})
export class CreateTargetPageModule {}
