import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase,
              private actionSheetCtrl: ActionSheetController
              ) {
    this.itemsRef$ = this.database.list('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsListPage');
  }

    selectItem(item: Item){
        console.log(item.itemName);

        this.actionSheetCtrl.create({
            title: `${item.itemName}`,
            buttons: [
                {
                    text: 'Edit',
                    handler: () => {
                        console.log('Edit clicked');
                        this.navCtrl.push('EditItemPage', {
                            itemId: item.$key
                        })
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        console.log('Delete clicked');
                        const promise =  this.itemsRef$.remove(item.$key);
                        promise
                            .then(_ => console.log('Deleted Item'))
                            .catch(err => console.log(err, 'Error Deleted Item'));
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        }).present();
    }

    goToAddItemPage() {
    console.log("Working");
        this.navCtrl.push('AddItemPage');
    }
}
