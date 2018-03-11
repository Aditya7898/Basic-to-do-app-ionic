import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database-deprecated';




@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // creating new object
  shoppingItem = { } as ShoppingItem;
  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private db: AngularFireDatabase) {

        this.shoppingItemRef$ = this.db.list('shopping-list');

        /* 
          shopping-list :
            0: 
               itemName: 'Bread',
               itemNumber: 2
            
            1:  
               itemName: 'Toast',
               itemNumber: 5
        
        */ 
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    
    //  create a new object 

        this.shoppingItemRef$.push({
          itemName: this.shoppingItem.itemName,
          itemNumber: Number(this.shoppingItem.itemNumber)
        });

        // Reset our shoppingItem
        this.shoppingItem = {} as ShoppingItem;

        // Navigate the user back to ShoppingList Page
        this.navCtrl.pop();
  }

}
