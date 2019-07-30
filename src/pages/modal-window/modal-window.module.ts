import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalWindowPage } from './modal-window';

@NgModule({
  declarations: [
    ModalWindowPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalWindowPage),
  ],
})
export class ModalWindowPageModule {}
