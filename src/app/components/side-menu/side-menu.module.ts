import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SideMenuComponent } from '../side-menu/side-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [SideMenuComponent],
  declarations: [SideMenuComponent]
})
export class SideMenuComponentModule {}
