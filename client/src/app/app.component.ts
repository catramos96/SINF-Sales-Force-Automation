import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TeamPage } from '../pages/team/team';
import { OpportunitiesPage } from '../pages/opportunities/opportunities';
import { SalesHistoryPage } from '../pages/sales-history/sales-history';
import { ProductPage } from '../pages/product/product';
import { ContactsPage } from '../pages/contacts/contacts';
import { StatisticsPage } from '../pages/statistics/statistics';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';

import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any, isVisible: boolean}>;
  isLoggedIn: boolean = false;
  isChefe: boolean = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private nativeStorage: NativeStorage, public events: Events) {
    this.initializeApp();
    nativeStorage.clear();

    events.subscribe('user:loggedin', (isLoggedIn, isChefe) => {
      this.pages = [
        { title: 'Login', component: LoginPage, isVisible: !isLoggedIn},
        { title: 'Register', component: RegisterPage, isVisible : isChefe },
        { title: 'Home', component: HomePage, isVisible: isLoggedIn },
        { title: 'Opportunities', component: OpportunitiesPage, isVisible: isLoggedIn },
        { title: 'Sales History', component: SalesHistoryPage, isVisible: isLoggedIn },
        { title: 'Product', component: ProductPage, isVisible: isLoggedIn },
        { title: 'Contacts', component: ContactsPage, isVisible: isLoggedIn },
        { title: 'Statistics', component: StatisticsPage, isVisible: isLoggedIn },
        { title: 'Team', component: TeamPage, isVisible: isLoggedIn },
      ];
    });

    this.tryLogIn(nativeStorage);

    this.pages = [
      { title: 'Login', component: LoginPage, isVisible: !this.isLoggedIn},
      { title: 'Register', component: RegisterPage, isVisible : this.isChefe },
      { title: 'Home', component: HomePage, isVisible: this.isLoggedIn },
      { title: 'Opportunities', component: OpportunitiesPage, isVisible: this.isLoggedIn },
      { title: 'Sales History', component: SalesHistoryPage, isVisible: this.isLoggedIn },
      { title: 'Product', component: ProductPage, isVisible: this.isLoggedIn },
      { title: 'Contacts', component: ContactsPage, isVisible: this.isLoggedIn },
      { title: 'Statistics', component: StatisticsPage, isVisible: this.isLoggedIn },
      { title: 'Team', component: TeamPage, isVisible: this.isLoggedIn },
    ];

  }



  public tryLogIn(nativeStorage : NativeStorage){
    nativeStorage.getItem("Role").then(
      data => {
        this.isLoggedIn = true;
        if(data == "Chefe"){
          this.isChefe = true;
        }
      this.rootPage = HomePage;
    },
      error => {
        this.isLoggedIn = false;
        this.isLoggedIn = false;
      }
    );

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
