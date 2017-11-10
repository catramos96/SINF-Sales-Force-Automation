import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyStatisticsPage } from './company-statistics';

@NgModule({
  declarations: [
    CompanyStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyStatisticsPage),
  ],
})
export class CompanyStatisticsPageModule {}
