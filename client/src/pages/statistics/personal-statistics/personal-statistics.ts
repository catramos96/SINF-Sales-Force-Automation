import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StatisticsProvider } from '../../../providers/statistics/statistics';
import { ModalContentPage } from '../../product/productModal';
import Chart from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-personal-statistics',
  templateUrl: 'personal-statistics.html',
})

export class PersonalStatisticsPage {
  private soldProductsNumber: string;
  private billedMoneyNumber: string;
  private top5Products: JSON[] = [];
  private top5Images: string[] = ["assets/imgs/logo.png"];

  //private pieChartLabels: string[] = ['CD Rom', 'Computadores', 'Teclados'];
  //private pieChartData: number[] = [1, 13, 1];
  private pieChartLabels: string[] = [];
  private pieChartData: number[] = [];
  private pieChartType: string = 'pie';

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
    /* this.createPieChart();
     let produtosVendidos = 150000;
     let billedMoneyNumber = 350000;
     this.soldProductsNumber = produtosVendidos.toLocaleString('pt-PT');
     this.billedMoneyNumber = billedMoneyNumber.toLocaleString('pt-PT');
     
     let boas = `[
       {
 "CodArtigo": "C0002",
 "DescArtigo": "GT-15000 600x1200ppp 48bit USB SCSI"
 },
   {
 "CodArtigo": "C0003",
 "DescArtigo": "Hand Scanner -TR89"
 },
   {
 "CodArtigo": "C0001",
 "DescArtigo": "Home Theater PC AMDx64 4200+"
 },
  {
 "CodArtigo": "B0002",
 "DescArtigo": "Gravador DVD Usb 2.0 Super Multi Drive"
 },
   {
 "CodArtigo": "B0007",
 "DescArtigo": "Rato R17B"
 }]`;
 
     this.top5Products = JSON.parse(boas);*/

    this.statisticsP.getTop5ProductsBySalesman().subscribe(
      data => {
        this.top5Products = data;
      },
      err => {

      });

    this.statisticsP.getSoldProductsNumberBySalesman().subscribe(
      data => {
        this.soldProductsNumber = data;
      },
      err => {

      });

    this.statisticsP.getSoldProductsByCategoryBySalesman().subscribe(
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

    this.statisticsP.getBilledMoneyNumberBySalesman().subscribe(
      data => {
        this.billedMoneyNumber = data.toFixed(2).toLocaleString('pt-PT');
      },
      err => {

      });

  }

  public createPieChart() {
    var ctx = document.getElementById("personalChart");

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
    for (i = 0; i < this.colorsChart.length; i++) {
      colors[i] = this.colorsChart[i];
    }

    return colors;
  }

  openModal(productID) {
    let modal = this.modalCtrl.create(ModalContentPage, { productID: productID });
    modal.present();
  }
}
