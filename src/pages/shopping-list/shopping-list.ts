import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppinglist$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private db: AngularFireDatabase,
              private actionSheetCtrl: ActionSheetController,
              private splashScreen: SplashScreen) {

    this.shoppinglist$ =  this.db.list('/shopping-list');
  }

  navigateToAddShoppingPage(){
    // navigates the user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }

  selectShoppingItem(shoppingItem: ShoppingItem){
    //  ActionSheet

    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler:() =>{
            this.navCtrl.push(EditShoppingItemPage, { shoppingItemId: shoppingItem.$key})
          }
        },

        {
          text: "delete",
          role: 'descructive',
          handler: () =>{
            this.shoppinglist$.remove(shoppingItem.$key);
          }
        },

        {
          text: "cancel",
          role : "cancel",
          handler: () => {
            console.log("The user has selected the cancel button")
          }
        }
      ]
    }).present();
  }

}
