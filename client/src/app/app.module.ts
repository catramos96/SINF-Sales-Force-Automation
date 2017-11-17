import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { ModalContentPage } from '../pages/product/productModal';
import { ContactsPage } from '../pages/contacts/contacts';
import { StatisticsPage } from '../pages/statistics/statistics';
import { SalesHistoryPage } from '../pages/sales-history/sales-history';
import { OpportunitiesPage } from '../pages/opportunities/opportunities';
import { OpportunityModalPage } from '../pages/opportunities/opportunity-modal/opportunity-modal';

import { ContactsProvider } from '../providers/contacts/contacts';
import { ProductsProvider } from '../providers/products/products';

import { CalendarModule } from 'angular-calendar';
import { StatisticsProvider } from '../providers/statistics/statistics';
import {TeamPage} from "../pages/team/team";
import {AppointmentModal} from "../pages/appointments/appointmentModal"
import { OpportunitiesProvider } from '../providers/opportunities/opportunities';
import { AppointmentsProvider } from '../providers/appointments/appointments';
import { RoutesProvider } from '../providers/routes/routes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductPage,
    ModalContentPage,
    AppointmentModal,
    ContactsPage,
    StatisticsPage,
    TeamPage,
    OpportunitiesPage,
    OpportunityModalPage,
    SalesHistoryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductPage,
    ModalContentPage,
    AppointmentModal,
    ContactsPage,
    StatisticsPage,
    TeamPage,
    OpportunitiesPage,
    OpportunityModalPage,
    SalesHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactsProvider,
    ProductsProvider,
    StatisticsProvider,
    OpportunitiesProvider,
    AppointmentsProvider,
    RoutesProvider
  ]
})
export class AppModule {}
