import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Splash } from '../pages/splash-screen/splash';

import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ShoppingListPage;

  constructor(platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // splashScreen.hide();

      let splash = modalCtrl.create(Splash);
      splash.present();
    });
  }
}

