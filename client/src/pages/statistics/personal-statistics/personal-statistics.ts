import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatisticsProvider } from '../../../providers/statistics/statistics';

@IonicPage()
@Component({
  selector: 'page-personal-statistics',
  templateUrl: 'personal-statistics.html',
})
export class PersonalStatisticsPage {
  private soldProductsNumber: number;
  private billedMoneyNumber: number;
  private top5Products: JSON[] = [];
  private productsSoldByCategory: JSON[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private statisticsP: StatisticsProvider) {
  }

  ionViewDidLoad() {
    this.statisticsP.getSoldProductsNumberBySalesman().subscribe(
      data => {
        this.soldProductsNumber = data;
      },
      err => {

      });

    this.statisticsP.getTop5ProductsBySalesman().subscribe(
      data => {
        this.top5Products = data;
      },
      err => {

      });

    this.statisticsP.getSoldProductsByCategoryBySalesman().subscribe(
      data => {
        this.productsSoldByCategory = data;
      },
      err => {

      });

    this.statisticsP.getBilledMoneyNumberBySalesman().subscribe(
      data => {
        this.billedMoneyNumber = data.toFixed(2);
      },
      err => {

      });
  }

}
