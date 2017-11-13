import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatisticsProvider } from '../../../providers/statistics/statistics';

@IonicPage()
@Component({
  selector: 'page-personal-statistics',
  templateUrl: 'personal-statistics.html',
})
export class PersonalStatisticsPage {
  soldProductsNumber: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private statisticsP: StatisticsProvider) {
  }

  ionViewDidLoad() {
    this.soldProductsNumber = this.statisticsP.getSoldProductsNumber();
  }

}
