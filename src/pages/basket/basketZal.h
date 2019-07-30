<ion-header>
  <ion-navbar>
    <ion-title>Doplňovač zásob :D</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>  
<ion-card *ngIf="total > 0" class="card-md">
<div class="sumarry"> 
      Máte {{countItems}} ks za {{total}} Kč
</div> 
</ion-card>
<ion-grid>
  <ion-list *ngFor="let row of listProducts">
    <ion-item class="item-basket" *ngFor="let item of row">
      <ion-card *ngIf="item" class="card-md full basket-card">
        <ion-avatar slot="start" class="ios my-avatar hydrated">
        <img src="{{item.image}}"> 
        </ion-avatar>   
        <ion-card-content class="basket-car-c">     
         <h4>{{item.title}}</h4>  
          <p float-left text-right margin-top>{{item.price}} Kč</p> 
           <div float-right>  
    
             <button  size="small" class="button-view" ion-button item-start (click)="setBasketItem(item, 1,'-')">-</button>
              <span class="count">{{showCountItem(item.id)}} </span>
             <button size="small" class="button-view" ion-button item-start (click)="setBasketItem(item, 1, '+')">+ </button>   
            
           </div>   
        </ion-card-content>
      </ion-card> 
    </ion-item>
  </ion-list>
</ion-grid>
<ion-card>
<div class="sumarry"> 
     Stisknutím tlačítka "ODESLAT OBJEDNÁVKU" souhlasíte s <a href="#" (click)="showCondition();">Obchodními a přepravními podmínkami</a>.
</div> 
</ion-card>
<ion-grid>
  <ion-row>
    <button padding ion-button full (click)="sendOrder()">ODESLAT OBJEDNÁVKU</button>  
  </ion-row> 
</ion-grid>
</ion-content>