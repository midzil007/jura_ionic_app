import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessConditionPage } from './business-condition';

@NgModule({
  declarations: [
    BusinessConditionPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessConditionPage),
  ],
})
export class BusinessConditionPageModule {}
