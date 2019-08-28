import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the EshopHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'eshop-header',
  templateUrl: 'eshop-header.html'
})
export class EshopHeaderComponent {
 	public searchTerm: string = "";
 	public items: any;
  constructor(private dataService: DataProvider) {
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

}
