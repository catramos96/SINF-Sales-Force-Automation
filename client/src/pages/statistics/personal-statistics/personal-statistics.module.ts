import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalStatisticsPage } from './personal-statistics';

@NgModule({
  declarations: [
    PersonalStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalStatisticsPage),
  ],
})
export class PersonalStatisticsPageModule {}
