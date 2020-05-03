import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticesModalPage } from './notices_modal.page';
import { PipesModule } from 'src/app/shared/utils/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PipesModule
  ],
  entryComponents: [
    NoticesModalPage
  ],
  declarations: [NoticesModalPage]
})
export class NoticesModalPageModule { }
