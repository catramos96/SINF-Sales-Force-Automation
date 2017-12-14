import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StatisticsProvider } from '../../../providers/statistics/statistics';

@IonicPage()
@Component({
  selector: 'page-statistics-modal',
  templateUrl: 'statistics-modal.html',
})

export class StatisticsModalPage {
  private header: string;
  private history: JSON[] = [];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams, private statisticsP: StatisticsProvider) {
    this.header = this.params.get('option');
    let salesman = this.params.get('salesman');
    this.getData(salesman);
  }

  public getData(salesman) {
    if (salesman == true) {
      this.getDataWithSalesman();
    } else {
      this.getDataWithoutSalesman();
    }
  }

  public getDataWithSalesman() {
    if (this.header === "Billed Money History") {
      this.statisticsP.getBilledMoneyNumberHistoryBySalesman().subscribe(
        data => {
          let i;
          for (i = 0; i < data.length; i++) {
            data[i].Quantidade = data[i].Quantidade.toLocaleString('pt-PT') + "€";
          }

          this.history = data;
        },
        err => {
          console.log(err);
        });
    }
    if (this.header === "Products Sold History") {
      this.statisticsP.getSoldProductsNumberHistoryBySalesman().subscribe(
        data => {
          let i;
          for (i = 0; i < data.length; i++) {
            if (data[i].Quantidade > 1) {
              data[i].Quantidade = data[i].Quantidade + " Products";
            } else {
              data[i].Quantidade = data[i].Quantidade + " Product";
            }            
          }

          this.history = data;
        },
        err => {
          console.log(err);
        });
    }
  }

  public getDataWithoutSalesman() {
    if (this.header === "Billed Money History") {
      this.statisticsP.getBilledMoneyNumberHistory().subscribe(
        data => {
          let i;
          for (i = 0; i < data.length; i++) {
            data[i].Quantidade = data[i].Quantidade.toLocaleString('pt-PT') + "€";
          }

          this.history = data;
        },
        err => {
          console.log(err);
        });
    }
    if (this.header === "Products Sold History") {
      this.statisticsP.getSoldProductsNumberHistory().subscribe(
        data => {
          let i;
          for (i = 0; i < data.length; i++) {
            if (data[i].Quantidade > 1) {
              data[i].Quantidade = data[i].Quantidade + " Products";
            } else {
              data[i].Quantidade = data[i].Quantidade + " Product";
            }
          }

          this.history = data;
        },
        err => {
          console.log(err);
        });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
