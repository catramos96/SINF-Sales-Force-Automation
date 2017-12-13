import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StatisticsProvider } from '../../../providers/statistics/statistics';
import { ModalContentPage } from '../../product/productModal';

@IonicPage()
@Component({
  selector: 'page-personal-statistics',
  templateUrl: 'personal-statistics.html',
})

export class PersonalStatisticsPage {
  private soldProductsNumber: string;
  private billedMoneyNumber: string;
  private top5Products: JSON[] = [];
  //private dataChartTest: JSON[] = [];
  private top5Images: string[] = [];

  //private productsSoldByCategory: JSON[] = [];

  //private pieChartLabels: string[] = ['CD Rom', 'Computadores', 'Teclados'];
  //private pieChartData: number[] = [1, 13, 1];
  private pieChartLabels: string[] = [];
  private pieChartData: number[] = [];
  private pieChartType: string = 'pie';

  /*public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40] }
  ];

  private chartOptions: any = {
    responsive: true
  };*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private statisticsP: StatisticsProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
   //let produtosVendidos = 150000;
    //let billedMoneyNumber = 350000;
    //this.soldProductsNumber = produtosVendidos.toLocaleString('pt-PT');
    //this.billedMoneyNumber = billedMoneyNumber.toLocaleString('pt-PT');
    this.top5Images = ["assets/imgs/logo.png"];

    this.statisticsP.getTop5ProductsBySalesman().subscribe(
      data => {
        this.top5Products = data;
      },
      err => {

      });
    /*
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

    this.statisticsP.getSoldProductsNumberBySalesman().subscribe(
      data => {
        this.soldProductsNumber = data;
      },
      err => {

      });

    this.statisticsP.getSoldProductsByCategoryBySalesman().subscribe(
      data => {
        let i;
        let labels: string[] = [];
        let quantidades: number[] = [];

        for (i = 0; i < data.length; i++) {
          quantidades[i] = data[i].Quantidade;
          labels[i] = data[i].FamiliaNome.toString();
        }

        this.pieChartData = quantidades;
        this.pieChartLabels = labels;
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

  openModal(productID) {
    console.log("boas");
    let modal = this.modalCtrl.create(ModalContentPage, { productID: productID });
    modal.present();
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
