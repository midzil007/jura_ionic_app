import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { CustomerPage } from '../customer/customer';
import { CustomerDataPage } from '../customer-data/customer-data';
import { Http } from '@angular/http';  
import { DataProvider } from '../../providers/data/data';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage() 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	public email : string;
  private navigate: string;
 
  constructor(public navCtrl: NavController, public view: ViewController, public http: Http, private data : DataProvider) {
     this.data.getOptions('navigate').then((navigate) => {
      if(navigate)
      {
        this.navigate = navigate;
    console.log(navigate);
       }
      else
      {
        this.navigate = '1';    
    	console.log( this.navigate);  
    	}
    })     
  }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad LoginPage'); 
  } 
  
  singIn()    
  {
    this.email = "b.kachlikova@akmrazik.cz";   
  	 this.http.get('https://www.svycarskekavovary.cz?loginapi=1&email='+this.email).map(res => res.json()).subscribe(data => {         
 	 	if(data.id)      
 	 	{           
 	 		this.data.save(data);
     
        this.data.saveOptions('1','navigate');   
        console.log(data);       
        this.navCtrl.push(CustomerDataPage,{data:data});                      
      }  
      // něco jako neplatný email
 	 //	console.log(this.islogin);    
 	 	 
    });  
  	
  } 
}
