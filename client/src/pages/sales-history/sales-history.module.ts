import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesHistoryPage } from './sales-history';

@NgModule({
  declarations: [
    SalesHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesHistoryPage),
  ],
})
export class SalesHistoryPageModule {}
