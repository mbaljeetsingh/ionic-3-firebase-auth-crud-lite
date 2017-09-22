import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Item} from '../../models/item/item.interface';

/**
 * Generated class for the ItemsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items-list',
  templateUrl: 'items-list.html',
})
export class ItemsListPage {
  itemsRef$: FirebaseListObservable<Item[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.itemsRef$ = this.database.list('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsListPage');
  }

    goToAddItemPage() {
    console.log("Working");
        this.navCtrl.push('AddItemPage');
    }

    editShoppingItem(item: Item){
      this.navCtrl.push('EditItemPage', {
        itemId: item.$key
      })
    }
    deleteShoppingItem(item: Item){
      this.itemsRef$.remove(item.$key);
    }
}
