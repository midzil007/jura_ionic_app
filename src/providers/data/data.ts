import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {
  prislusenstvi: any;
  islogin : boolean = false; 
  public items: any = [];
  public machinelist =[];
  public basketlist =[];
  constructor(public storage: Storage, public http: Http){
  }

   filterItems(searchTerm) { 
     this.http.get('https://www.svycarskekavovary.cz/jura/?getproducts=1&search='+searchTerm).map(res => res.json()).subscribe(data => {
        this.items = data.products;   
        console.log(this.items);
    });   
      return this.items    
  }    



  clearStorage(): void
  {
    this.storage.clear(); 
  }

  saveOptions(option, optionName : string)
  {    
    this.storage.set(optionName ,option);
  }



  getOptions(optionName : string)
  { 
     return this.storage.get(optionName);
  }

  dataInitItems(){
        this.http.get('https://www.shop-jura.cz/?getproducts=1&onlykavovars=1').map(res => res.json()).subscribe(data => {
        this.items = data.products;
    });
  }; 
     
 
   getData() { 
     return this.storage.get('userdata');  
  }    
 
  save(lastdata){
    let newData = JSON.stringify(lastdata);
    this.storage.set('userdata', newData);  
  }  
  
  getMachinesList() 
  {
   //
    return this.storage.get('machinelist'); 
  }
 
  getBasketList() 
  {  
     return this.storage.get('basketlist');  
  }

  
 
  saveToMachineList(item) 
  {
    // tady dosetovat přislušetvni z internetu
       //tady dodělat init z db count aby bylo nula
    let url = 'https://www.shop-jura.cz/?getproducts=1&prislusenstvi=1&nodeid='+item.id;
    //url =   'https://www.shop-jura.cz/?getproducts=1&onlykavovars=1';
    this.http.get(url).map(res => res.json()).
    subscribe(    
       result => {
      this.prislusenstvi=result.products;
      let machine = {
        id: item.id,
        title: item.title,
        machineprop: this.prislusenstvi
      };  
      // tady test jesli je to ok
      this.machinelist.push({key:item.id, value:machine});  
      this.storage.set('machinelist', this.machinelist); 
    })
    ;  
   
    //
    //console.log(this.machinelist);            
    // 
  }
}