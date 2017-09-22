import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    user = {
        email : 'admin@admin.com',
        password: 'password'
    } as User;

    constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
    }

    ionViewDidLoad(){
        console.log("Ion View Did Load");
        this.authProvider.isLoggedIn().subscribe(data => {
            if (data && data.email && data.uid) {
                this.navCtrl.setRoot('ItemsListPage');
            }
        })
    }

    async login(user: User) {
      console.log("Login:", user);
        try {
            const result = await this.authProvider.login(user);
            if (result) {
                this.navCtrl.setRoot('ItemsListPage');
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    async register(user: User) {
        console.log("Register:", user);
        try {
            const result = await this.authProvider.register(user);
            if (result) {
                this.navCtrl.setRoot('ItemsListPage');
            }
        } catch (e) {
            console.error(e);
        }
    }

}
