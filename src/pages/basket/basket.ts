import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers,RequestOptions } from '@angular/http';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { BusinessConditionPage } from '../../pages/business-condition/business-condition'; 
import { DetailPage } from '../../pages/detail/detail'; 
 export interface Product
{  
  id: number,
  title: string,
  url: string,
  photo: string,
  html: string,
  price: number,
  dph: number,
  isTopOffer: boolean
};

export interface BasketItem
{
  id: number,
  count: number,
  price: number,
  title: string,
  dph: number
}

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  private listProducts : Array<Array<Product>>;
  private listProducts2 : Array<Array<Product>>;
  private listBasketItems = []; 
  private saveListBasketItems = [];
  private savedBasketItems =[];  
  private savedDelivery;
  private savedPayment;
  private userData = [];
  private nodeId : number;
  public searchTerm: string = "";
  public items: any;

  countItems : number;
  total : number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage,private http: Http, private dataService: DataProvider) {
    this.nodeId = this.navParams.get('nodeid');  
    this.dataService.saveOptions('4','navigate');  
    this.listProducts = [];    
    this.listProducts2 = [];    
    this.listBasketItems = [];
    this.savedBasketItems = [];
    this.total = 0;
    this.countItems = 0;   
    this.dataService.getOptions("savedBasketItems").then((savedBasketItems) => { 
      if(savedBasketItems){              
         this.savedBasketItems = savedBasketItems;    
      }       
    });  
    this.http.get('https://www.svycarskekavovary.cz?getproducts=1&nodeid='+this.nodeId).map(res => res.json()).subscribe(data => {
    this.listProducts = this.initProducts(data.products);   

    });             
    this.dataService.getOptions("payment").then((payment) => {
      if(payment){   
         this.savedPayment = payment; 
      }})
    this.dataService.getOptions("delivery").then((delivery) => {
      if(delivery){         
         this.savedDelivery = delivery; 
      }})
     this.dataService.getData().then((userdata) => {
      if(userdata){  
        this.userData = JSON.parse(userdata);         
      }    
     });
  } 


  ngOnInit() {
    //this.setFilteredItems();
  }

  setFilteredItems() {  
    if(this.searchTerm !="")
    {
      this.items = this.dataService.filterItems(this.searchTerm);
    }
    else{
      this.items = []; 
    }
    
  }


  showCondition():void  
  {     
    this.navCtrl.push(BusinessConditionPage);
  }


  showDetail(item):void   
  {      
    
    this.navCtrl.push(DetailPage,{item:item});
  }  
  
 

 initProducts(data: any) : Array<Array<Product>>
  {  
   
    let list : Array<Array<Product>> = [];
     let rowNum : number  = 0;
     let item :  any;
     let ii : number = 0;
     for (let i = 0; i < data.length; i+=2) { //iterate images

      list[rowNum] = Array(2); //declare two elements per row
        if (data[i]) { //check file URI exists
          item = data[i];
          list[rowNum][0] = <Product>{
              id: item.id,
              title: item.title, 
              url: item.path,
              price: item.price,    
              html: item.html,
              photo: item.photo,
              dph : item.dph,
              isTopOffer : item.topOffer
            }
             this.iniBasketItem(item);
        }
        if (data[i+1]) { //repeat for the second image
          item = data[i+1];
          list[rowNum][1] = <Product>{
              id: item.id,
              title: item.title, 
              url: item.path,
              price: item.price,    
              html: item.html, 
              photo: item.photo,
              dph : item.dph,
              isTopOffer : item.topOffer
            }
            this.iniBasketItem(item);
        }

        rowNum++; //go on to the next row   
      }  
      for (var saveItem of this.savedBasketItems)
       {
        this.getGoupInfoBasket(saveItem); 
        }        
       return list;
  }

  setBasketItem(item : any, count : number, mark : string) : void
  {

    let temp =  [];  
    let insert : boolean;
    let dataItem = <BasketItem>{
         id: item.id,  
         price: item.price,     
         count:  count,   
         title: item.title,
         dph: item.dph 
       };
    let tempItem :any;   
    this.total = 0;
    this.countItems = 0;       
    for (var saveItem of this.savedBasketItems) {
         if(saveItem.id == item.id){
             if(mark == '+')
             {
               dataItem.count = saveItem.count + 1;  
               console.log(dataItem.count);
             }
             else{
               dataItem.count = saveItem.count - 1;  
               console.log(dataItem.count); 

             }
             if(dataItem.count < 0){
               dataItem.count = 0
             }   
             this.getGoupInfoBasket(dataItem);
             console.log(dataItem);    
             temp.push(dataItem);
             insert = true;
         } 
         else{
            temp.push(saveItem); 
            this.getGoupInfoBasket(saveItem);
         }
    }     
    if(!insert)    
    {   
       temp.push(dataItem); 
       this.getGoupInfoBasket(dataItem); 
    }     
    // tady to chce projet items list a ty inicialotovat....
   // console.log(this.listProducts);   
    //this.listBasketItems = this.init;
    this.savedBasketItems = temp;             
    this.dataService.saveOptions(temp, "savedBasketItems");   
  }

 

   iniBasketItem(item : Product) : void
  {      
    let dataItem = <BasketItem>{
         id: item.id,  
         price: item.price,     
         count:  0,  
         title: item.title,
         dph: item.dph
       }; 
     
       let temp = [];     
       let isIn  : Boolean = false;  
       //console.log(this.saveListBasketItems);  
       for (var saveItem of this.savedBasketItems)
       {
         if(saveItem.id == dataItem.id)
         { 
            this.listBasketItems.push(saveItem);
            
         }
         isIn = true;     
       }
       if(isIn == false) 
       {  
         this.listBasketItems.push(dataItem);
        
       }  
     // console.log(this.listBasketItems);     
   }      
  

   getGoupInfoBasket(item : BasketItem) : void
  {
    this.total += (item.count * item.price) ; 
    this.countItems += item.count;
  }

  showCountItem(itemId : Number) : Number
  {  
   for (var item of this.savedBasketItems) {
      if(item.id == itemId)
      {    
        return item.count;   
      }
    }
    return 0; 
  } 
 
  sendOrder()
  {

     var link = 'http://dunavox.specshop.cz/?test=1&requestIonicOrder=1';
      let bsdy = {
      payment: this.savedPayment, 
      delivery: this.savedDelivery,
      data: this.listBasketItems,
      userData: this.userData
    };     
        this.http.post(link, JSON.stringify(bsdy))
        .subscribe(data => {
        
        }, error => {
            console.log("Oooops!");
        });
  }
}
 