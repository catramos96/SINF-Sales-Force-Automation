import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StatisticsProvider } from '../../../providers/statistics/statistics';
import { ModalContentPage } from '../../product/productModal';
import { StatisticsModalPage } from '../statistics-modal/statistics-modal'
import Chart from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-company-statistics',
  templateUrl: 'company-statistics.html',
})
export class CompanyStatisticsPage {

  private soldProductsNumber: number;
  private billedMoneyNumber: number;
  private top5Products: JSON[] = [];
  private top5Images: string[] = ["assets/imgs/logo.png"];

  private pieChartLabels: string[] = [];
  private pieChartData: number[] = [];

  private colorsChart: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(121, 159, 64, 0.2)',
    'rgba(121, 159, 206, 0.2)',
    'rgba(239, 168, 213, 0.2)',
    'rgba(54, 89, 62, 0.2)',
    'rgba(249, 89, 62, 0.2)',
    'rgba(249, 236, 62, 0.2)',
    'rgba(249, 236, 179, 0.2)',
    'rgba(11, 123, 221, 0.2)',
    'rgba(138, 139, 140, 0.2)'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private statisticsP: StatisticsProvider, public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.statisticsP.getSoldProductsNumber().subscribe(
      data => {
        this.soldProductsNumber = data.toFixed(2).toLocaleString('pt-PT');;
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
        let i;
        for (i = 0; i < data.length; i++) {
          this.pieChartData[i] = data[i].Quantidade;
          this.pieChartLabels[i] = data[i].FamiliaNome.toString();
        }

        this.createPieChart();
      },
      err => {

      });

    this.statisticsP.getBilledMoneyNumber().subscribe(
      data => {
        this.billedMoneyNumber = data.toFixed(2).toLocaleString('pt-PT');
      },
      err => {

      });
  }

  public createPieChart() {
    var ctx = document.getElementById("companyChart");

    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: this.pieChartData,
          backgroundColor: this.poolColors(this.pieChartData.length),
        }],
        labels: this.pieChartLabels
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  private poolColors(length) {
    let colors = [];
    let i;
    for (i = 0; i < length; i++) {
      colors[i] = this.colorsChart[i];
    }

    return colors;
  }

  openProductModal(productID) {
    let modal = this.modalCtrl.create(ModalContentPage, { productID: productID });
    modal.present();
  }

  openStatisticsModal(option) {
    let modal = this.modalCtrl.create(StatisticsModalPage, { option: option, salesman: false });
    modal.present();
  }

}
