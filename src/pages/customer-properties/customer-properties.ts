import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';  
import { CustomerPage } from '../../pages/customer/customer';
import { BasketPage }  from  '../../pages/basket/basket';
import { TabsPage } from '../../pages/tabs/tabs';
import { Platform } from 'ionic-angular';
import { Http, Headers,RequestOptions } from '@angular/http';

export interface Item
{
  id: number,
  price: number,     
  title: string,
  selected: boolean,
}

@IonicPage()
@Component({
  selector: 'page-customer-properties',
  templateUrl: 'customer-properties.html',
})

export class CustomerPropertiesPage {
         
  public listArray: number[] = []; 
  private listProducts : Array<Item>; 
  private ids : string;
 
  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams,private http: Http, private data: DataProvider) {
    this.listProducts = [];
    this.data.getOptions("machines").then((machines) =>
    {
      this.ids = machines; 
     });   
    this.http.get('https://www.svycarskekavovary.cz?getproducts=1&onlykavovars=1').map(res => res.json()).subscribe(data => {
    this.listProducts = this.initItems(data.products);
    });          
  } 
 
 onChangeMachine(nodeId) 
 {
   console.log(nodeId);     
   console.log(this.listProducts);   
 }
 
 initItems(data: any): Array<Item>
  {
     console.log(this.ids);
    let list : Array<Item> = [];
    let chech : boolean;
     let i : number  = 0;
     for (let item of data)  
       {
           chech = false;
           if(this.ids.search(item.id)>=0)
           {
            chech = true;  
           }
             list[i] = <Item>{
              id: item.id, 
              price: item.price,
              title : item.title,  
              selected: chech 
            }   
           
            i++; 
       }  
       return list;
  }

  saveOptions()
  {   
  // pridat krok  
    this.ids = '';
    for (let item of this.listProducts)
    {
     if(item.selected)
     {
          this.listArray.push(item.id);  
     }
    } 
    this.ids = this.listArray.join(';');
    this.data.saveOptions(this.ids, "machines");
    this.data.saveOptions('4','navigate');
    this.navCtrl.push(BasketPage);      
          
  }
}
