import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalStatisticsPage } from './personal-statistics';
//import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PersonalStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalStatisticsPage),
    //ChartsModule
  ],
})
export class PersonalStatisticsPageModule {}
