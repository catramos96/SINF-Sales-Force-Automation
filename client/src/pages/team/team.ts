import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { VendorsProvider } from '../../providers/vendors/vendors';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  private teamChefe = {Nome: ""}
  public teamMembers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private vendorProvider: VendorsProvider, private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {

    this.nativeStorage.getItem("Role").then(
      role => {
        this.nativeStorage.getItem("Id").then(
          id => {
            this.nativeStorage.getItem("Nome").then(
              nome => {
                if (role == "Chefe") {
                  this.teamChefe = { Nome: nome };
                  this.vendorProvider.getChiefTeam(id).subscribe(
                    data => {
                      while (data.length > 0)
                        this.teamMembers.push(data.splice(0, 4));
                    },
                    err => {

                    });

                } else if (role == "Vendedor") {

                  this.vendorProvider.getVendorChief(id).subscribe(
                    data => {
                      if (data.length > 0) {
                        this.teamChefe = data[0];
                      }
                    },
                    err => {

                    });

                  this.teamMembers.push({ Nome: nome });

                  this.vendorProvider.getVendorTeam(id).subscribe(
                    data => {
                      let start = 1;
                      while (data.length > 0) {
                        if (start == 1) {
                          this.teamMembers.push(data.splice(0, 3));
                          start++;
                        } else {
                          this.teamMembers.push(data.splice(0, 4));
                        }
                      }
                    },
                    err => {

                    });


                } else {
                  alert("Please Login!");
                }




              });

          }
        );




      },
      error => {

      }
    )



  }


}

