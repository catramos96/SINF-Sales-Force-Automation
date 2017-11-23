import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatisticsProvider } from '../../../providers/statistics/statistics';

@IonicPage()
@Component({
  selector: 'page-company-statistics',
  templateUrl: 'company-statistics.html',
})
export class CompanyStatisticsPage {

  private soldProductsNumber: number;
  private billedMoneyNumber: number;
  private top5Products: JSON[] = [];
  private productsSoldByCategory: JSON[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private statisticsP: StatisticsProvider) {
  }

  ionViewDidLoad() {
    this.statisticsP.getSoldProductsNumber().subscribe(
      data => {
        this.soldProductsNumber = data;
      },
      err => {

      });

    this.statisticsP.getTop5Products().subscribe(
      data => {
        this.top5Products = data;
      },
      err => {

      });

    this.statisticsP.getSoldProductsByCategory().subscribe(
      data => {
        this.productsSoldByCategory = data;
      },
      err => {

      });

    this.statisticsP.getBilledMoneyNumber().subscribe(
      data => {
        this.billedMoneyNumber = data.toFixed(2);
      },
      err => {

      });
  }

}
