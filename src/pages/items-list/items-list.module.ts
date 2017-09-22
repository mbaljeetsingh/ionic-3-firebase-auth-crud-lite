import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsListPage } from './items-list';

@NgModule({
  declarations: [
    ItemsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsListPage),
  ],
})
export class ItemsListPageModule {}
