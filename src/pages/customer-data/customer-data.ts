import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { ModalWindowPage } from '../../pages/modal-window/modal-window';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { CustomerDeliveryPage} from '../../pages/customer-delivery/customer-delivery'; 
import { CustomerPage } from '../../pages/customer/customer'; 
import { DataProvider } from '../../providers/data/data';
import { NumberValidator} from '../../validators/number';

   

/** 
*validatece html
*   <ion-item *ngIf="!formValidatorUser.controls.fu_phone.valid  && (formValidatorUser.controls.fu_phone.touched || saveCustomer)">
*                <p>Prosím vložte fu_phone</p>
 *   </ion-item>   
*
 * Generated class for the CustomerDataPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */ 
@IonicPage()
@Component({
  selector: 'page-customer-data',
  templateUrl: 'customer-data.html',  
})
export class CustomerDataPage {

   lastData = [];
   getMachinesList = [];  
   fu_jmeno : string; 
   formValidatorUser: FormGroup;

    constructor(public modalCtrl: ModalController, private navCtrl : NavController, public navParams: NavParams, public dataService: DataProvider,  public formBuilder: FormBuilder) {
      this.formValidatorUser = formBuilder.group({
          fu_jmeno: ['',  Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+ [a-zA-Z0-9-]+$'), Validators.required])],
          fu_phone: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(9), Validators.pattern('[0-9]*'), Validators.required])], 
          email: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
          fu_ulice: ['',  Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+ [a-zA-Z0-9-]+$'), Validators.required])],
          fu_mesto: ['',  Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+$'), Validators.required])],
          fu_firma: ['',  Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+$')])],
          fir_sur:  ['',  Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+ [a-zA-Z0-9-]+$')])],
          fu_psc: ['', Validators.compose([ Validators.minLength(5), Validators.pattern('[0-9]*')])], 
          fu_ico: [''],
          fu_dic: [''],
          firma: ['',  Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+$')])],
          phone: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(9), Validators.pattern('[0-9]*')])],
          ulice: ['',  Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+ [a-zA-Z0-9-]+$')])],
          mesto:  ['',  Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+$')])],
          psc: ['', Validators.compose([Validators.minLength(5), Validators.pattern('[0-9]*')])], 
      });   

      if(this.navParams.get('data'))
      {
        this.lastData = this.navParams.get('data');    
      }
      else{
        this.dataService.getData().then((userdata) => {
      if(userdata){
          this.lastData = JSON.parse(userdata);         
      }

    }); 
      }  
  }   

  saveCustomer()
  { 
      this.dataService.save(this.lastData);    
      this.dataService.getOptions('navigate').then((navigate) => {  
      if(navigate == '1')
      {
        this.dataService.saveOptions('2','navigate');
        this.navCtrl.push(CustomerDeliveryPage,{});           
      }  
      else{
          this.dataService.saveOptions('1','navigate');
          let profileModal = this.modalCtrl.create(ModalWindowPage, {});
          profileModal.present();
        this.navCtrl.push(CustomerPage);   
      }
     });

    } 

}
  