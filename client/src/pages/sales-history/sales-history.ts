import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalesProvider } from '../../providers/sales/sales';

/**
 * Generated class for the SalesHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-history',
  templateUrl: 'sales-history.html',
})
export class SalesHistoryPage {

  sales = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private salesService: SalesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesHistoryPage');
    this.getSales();
  }

  getSales(){
    
    this.salesService.getSalesByDate().subscribe(
      data => { 
          this.sales = data;

          this.sales.forEach(element => {
            element.Data = element.Data.substring(0,10);
          });
      },
      err => {
          console.log(err);
      });
      
      /*
    this.sales = [
      {
        Data: "1/11/17",
        Vendas: [
          {Entidade: "aaa",
          TotalMerc: "123"},
          {Entidade: "bbb",
          TotalMerc: "123"},
          {Entidade: "ccc",
          TotalMerc: "123"}
        ]
      },
      {
        Data: "2/11/17",
        Vendas: [
          {Entidade: "aaa",
          TotalMerc: "123"},
          {Entidade: "bbb",
          TotalMerc: "123"},
          {Entidade: "ccc",
          TotalMerc: "123"},
        ]
      }
    ];*/
  }

}
