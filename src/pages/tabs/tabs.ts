import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { CustomerPage } from '../customer/customer';
import { BasketPage } from '../basket/basket';
import { SectionPage } from '../section/section';
import { InstactionsPage } from '../instactions/instactions';
   
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {  
	tab1Root = SectionPage;
	tab2Root = CustomerPage;
	tab3Root = InstactionsPage;
	tab4Root = ContactPage; 

  constructor() {

  }
}
