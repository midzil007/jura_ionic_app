import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DataProvider } from '../providers/data/data';
import { TabsPage } from '../pages/tabs/tabs';  
import { CustomerDataPage } from '../pages/customer-data/customer-data';
import { CustomerDeliveryPage } from '../pages/customer-delivery/customer-delivery'; 
import { CustomerPropertiesPage } from '../pages/customer-properties/customer-properties'; 
  
@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  rootPage:any ;
  temp: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public data: DataProvider) { 
      this.data.getOptions('navigate').then((navigate) => {
        console.log(navigate);
       if(navigate){ 
           switch (navigate) {
             case "1":
               //this.rootPage = LoginPage;      
                 this.rootPage = CustomerDataPage;
               break;
             case "2":
             this.rootPage = CustomerDeliveryPage;
                break;
             case "3":
                 this.rootPage = CustomerPropertiesPage;
             break;
             case "4":
                 this.rootPage = TabsPage;
               break;   
             default:      
               this.rootPage = LoginPage;      
               break;
           }
       } 
       else{
            this.rootPage = LoginPage;        
       }
     });
//    this.dataService.getData().then((userData) => {
  //    this.temp = JSON.parse(userData);       

             
      //if(this.temp != null){        
     //   this.rootPage = TabsPage;    
      //}
      //else{  
      
    //  } 
    //});
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }); 
  }
}

