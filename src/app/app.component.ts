import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
  rootPage:any = 'LoginPage';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authProvider: AuthProvider) {
      this.authProvider.getAuthState().subscribe(data => {
          if (data && data.email && data.uid) {
              this.nav.setRoot('ItemsListPage');
          }
      });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

    onLogout() {
        this.authProvider.logout();
        this.nav.setRoot('LoginPage');
    }

    goToLoginPage(){
        this.nav.setRoot('LoginPage');
    }
}

