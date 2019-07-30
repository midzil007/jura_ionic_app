import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OrdersPage} from '../pages/orders/orders';
import { InstactionsPage} from '../pages/instactions/instactions';
import { BasketPage} from '../pages/basket/basket';  
import { CustomerPage } from '../pages/customer/customer';
import { DetailPage } from '../pages/detail/detail';
import { SectionPage } from '../pages/section/section';
import { CustomerDataPage } from '../pages/customer-data/customer-data';
import { CustomerDeliveryPage } from '../pages/customer-delivery/customer-delivery';
import { CustomerPropertiesPage } from '../pages/customer-properties/customer-properties';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';  
import { DataProvider } from '../providers/data/data';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp, 
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CustomerPage,
    SectionPage,
    CustomerDataPage,
    CustomerDeliveryPage,
    CustomerPropertiesPage,
    OrdersPage,
    BasketPage,
    DetailPage,
    InstactionsPage

  ],
  imports: [  
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CustomerPage,  
    SectionPage,
    CustomerDataPage,
    CustomerDeliveryPage,
    CustomerPropertiesPage,
    OrdersPage,
    BasketPage,
    InstactionsPage,
    DetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,  
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
