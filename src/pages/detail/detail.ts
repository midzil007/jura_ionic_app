import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

	item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	if(this.navParams.get('item'))
      {    
        console.log(this.navParams.get('item'));       
        this.item = this.navParams.get('item');
         
      }
       console.log(this.item);   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
