import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReserveStockPage } from './reserve-stock';

@NgModule({
  declarations: [
    ReserveStockPage,
  ],
  imports: [
    IonicPageModule.forChild(ReserveStockPage),
  ],
})
export class ReserveStockPageModule {}
