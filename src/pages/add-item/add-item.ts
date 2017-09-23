import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Item} from '../../models/item/item.interface';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  item = {} as Item;

  itemsRef$ : FirebaseListObservable<Item[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase
  ) {
    this.itemsRef$ = this.database.list('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

    saveItem(item: Item) {
        console.log(item);


        const promise =  this.itemsRef$.push({
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            itemNumber: Number(item.itemNumber),
        });
        promise
            .then(_ => {
                console.log('Added Item');
                this.item = {} as Item;
                this.navCtrl.pop();
            } )
            .catch(err => console.log(err, 'Error Adding Item'));



    }
}
