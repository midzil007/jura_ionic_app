import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { BasketPage } from '../basket/basket';

/**
 * Generated class for the SectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-section',
  templateUrl: 'section.html',
})
export class SectionPage {
	
	sectionList = [];

  constructor(private navCtrl: NavController, private http: Http) {

    this.sectionList = [];
    this.http.get('https://www.svycarskekavovary.cz?section=1').map(res => res.json()).subscribe(data => {
	  this.sectionList = (data);    
    });  
  }

   itemSelected(id:number){
   	console.log(id);     
   this.navCtrl.push(BasketPage,{nodeid:id});     
   }
}
