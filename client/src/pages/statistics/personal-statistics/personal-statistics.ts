import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatisticsProvider } from '../../../providers/statistics/statistics';

@IonicPage()
@Component({
  selector: 'page-personal-statistics',
  templateUrl: 'personal-statistics.html',
})

export class PersonalStatisticsPage {
  private soldProductsNumber: string;
  private billedMoneyNumber: string;
  private top5Products: JSON[] = [];
  //private productsSoldByCategory: JSON[] = [];

 private pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  private pieChartData: number[] = [1, 1, 13];
  //private pieChartLabels: string[] = [];
  //private pieChartData: number[] = [];
  private pieChartType: string = 'pie';

  constructor(public navCtrl: NavController, public navParams: NavParams, private statisticsP: StatisticsProvider) {
  }

  ionViewDidLoad() {
    let produtosVendidos = 150000;
    let billedMoneyNumber = 350000;
    this.soldProductsNumber = produtosVendidos.toLocaleString('pt-PT');
    this.billedMoneyNumber = billedMoneyNumber.toLocaleString('pt-PT');
    /*this.statisticsP.getSoldProductsNumberBySalesman().subscribe(
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

    /*this.statisticsP.getSoldProductsByCategoryBySalesman().subscribe(
      data => {
        let i;
        for (i = 0; i < data.length; i++) {
          this.pieChartData[i] = data[i].Quantidade;
          this.pieChartLabels[i] = data[i].FamiliaNome;
        }
      },
        err => {
        
    });     

    this.statisticsP.getBilledMoneyNumberBySalesman().subscribe(
      data => {
        this.billedMoneyNumber = data.toFixed(2);
      },
      err => {

      });*/

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
