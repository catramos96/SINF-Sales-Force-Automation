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
import { ClientPage } from '../pages/contacts/client/client';
import { TargetPage } from '../pages/contacts/target/target';
import { StatisticsPage } from '../pages/statistics/statistics';
import { SalesHistoryPage } from '../pages/sales-history/sales-history';
import { OpportunitiesPage } from '../pages/opportunities/opportunities';
import { OpportunityDetailsPage } from '../pages/opportunities/opportunity-details/opportunity-details';
import { CreateOpportunityPage } from '../pages/opportunities/create-opportunity/create-opportunity';

import { ContactsProvider } from '../providers/contacts/contacts';
import { ProductsProvider } from '../providers/products/products';

import { CalendarModule } from 'angular-calendar';
//import { ChartsModule } from 'ng2-charts';
import { StatisticsProvider } from '../providers/statistics/statistics';
import { TeamPage } from "../pages/team/team";
import { AppointmentModal } from "../pages/appointments/appointmentModal"
import { OpportunitiesProvider } from '../providers/opportunities/opportunities';
import { AppointmentsProvider } from '../providers/appointments/appointments';
import { SalesProvider } from '../providers/sales/sales';
import { RoutesProvider } from '../providers/routes/routes';
import {CreateAppointmentsModalPage} from "../pages/appointments/create-appointments-modal/create-appointments-modal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductPage,
    ModalContentPage,
    AppointmentModal,
    ContactsPage,
    ClientPage,
    TargetPage,
    StatisticsPage,
    TeamPage,
    OpportunitiesPage,
    OpportunityDetailsPage,
    CreateOpportunityPage,
    CreateAppointmentsModalPage,
    SalesHistoryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule,
   // ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductPage,
    ModalContentPage,
    AppointmentModal,
    ContactsPage,
    ClientPage,
    TargetPage,
    StatisticsPage,
    TeamPage,
    OpportunitiesPage,
    OpportunityDetailsPage,
    SalesHistoryPage,
    CreateAppointmentsModalPage,
    CreateOpportunityPage
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
    RoutesProvider
  ]
})
export class AppModule {}
