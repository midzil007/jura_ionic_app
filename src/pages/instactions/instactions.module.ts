import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstactionsPage } from './instactions';

@NgModule({
  declarations: [
    InstactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstactionsPage),
  ],
})
export class InstactionsPageModule {}
