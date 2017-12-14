import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { ModalContentPage } from '../pages/product/productModal';
import { StatisticsModalPage } from '../pages/statistics/statistics-modal/statistics-modal';
import { ContactsPage } from '../pages/contacts/contacts';
import { StatisticsPage } from '../pages/statistics/statistics';
import { SalesHistoryPage } from '../pages/sales-history/sales-history';
import { OpportunitiesPage } from '../pages/opportunities/opportunities';
import { OpportunityModalPage } from '../pages/opportunities/opportunity-modal/opportunity-modal';
import { CreateOpportunityPage } from '../pages/opportunities/create-opportunity/create-opportunity';

import { ContactsProvider } from '../providers/contacts/contacts';
import { ProductsProvider } from '../providers/products/products';

import { CalendarModule } from 'angular-calendar';
import { ChartsModule } from 'ng2-charts';
import { StatisticsProvider } from '../providers/statistics/statistics';
import { TeamPage } from "../pages/team/team";
import { OpportunitiesProvider } from '../providers/opportunities/opportunities';
import { AppointmentsProvider } from '../providers/appointments/appointments';
import { SalesProvider } from '../providers/sales/sales';
import { RoutesProvider } from '../providers/routes/routes';
import {CreateAppointmentsModalPage} from "../pages/appointments/create-appointments-modal/create-appointments-modal";
import {SchedulePage} from "../pages/schedule/schedule";
import {ViewAppointmentModalPage} from "../pages/appointments/view-appointment-modal/view-appointment-modal";

import { RegisterPage } from '../pages/register/register';
import { VendorsProvider } from '../providers/vendors/vendors';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductPage,
    ModalContentPage,
    ContactsPage,
    StatisticsPage,
    TeamPage,
    OpportunitiesPage,
    OpportunityModalPage,
    CreateOpportunityPage,
    CreateAppointmentsModalPage,
    ViewAppointmentModalPage,
    SalesHistoryPage,
    SchedulePage,
    RegisterPage,
    LoginPage,
    StatisticsModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductPage,
    ModalContentPage,
    ContactsPage,
    StatisticsPage,
    TeamPage,
    OpportunitiesPage,
    OpportunityModalPage,
    CreateAppointmentsModalPage,
    CreateOpportunityPage,
    SchedulePage,
    ViewAppointmentModalPage,
    SalesHistoryPage,
    RegisterPage,
    LoginPage,
    StatisticsModalPage
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
    SalesProvider,
    RoutesProvider,
    VendorsProvider,
    NativeStorage
  ]
})
export class AppModule {}
