import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyStatisticsPage } from './company-statistics';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CompanyStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyStatisticsPage),
    ChartsModule
  ],
})
export class CompanyStatisticsPageModule {}
