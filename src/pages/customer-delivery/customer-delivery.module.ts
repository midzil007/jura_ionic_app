import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerDeliveryPage } from './customer-delivery';

@NgModule({
  declarations: [
    CustomerDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerDeliveryPage),
  ],
})
export class CustomerDeliveryPageModule {}
