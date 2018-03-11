import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItem$ : FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;
  subscription: Subscription;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private db: AngularFireDatabase) {

    const shoppingItemId = this.navParams.get('shoppingItemId');
    console.log(shoppingItemId);
    this.shoppingItem$ = this.db.object(`shopping-list/${shoppingItemId}`);
    this.subscription= this.shoppingItem$.subscribe(shoppingItem => {
      this.shoppingItem = shoppingItem;
    });
  }

  editShoppingItem(shoppingItem: ShoppingItem){
       this.shoppingItem$.update(shoppingItem);
       this.navCtrl.pop();
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

}
