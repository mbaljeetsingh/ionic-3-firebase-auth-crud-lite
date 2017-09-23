import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Item} from '../../models/item/item.interface';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  item = {} as Item;

  itemRef$ : FirebaseObjectObservable<Item>;

  itemSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase
  ) {
    const itemId = this.navParams.get('itemId');
    this.itemRef$ = this.database.object(`items/${itemId}`);

    this.itemSubscription = this.itemRef$.subscribe(item => {
      this.item = item;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');
  }

    EditItem(item: Item) {
        const promise =  this.itemRef$.update({
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            itemNumber: Number(item.itemNumber),
        });
        promise
            .then(_ => {
                console.log('Updated Item')
                this.navCtrl.pop();
            })
            .catch(err => console.log(err, 'Error Updating Item'));
    }

    ionViewWillLeave(){
      this.itemSubscription.unsubscribe();
    }
}
