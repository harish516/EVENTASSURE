import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdviserPage } from './adviser.page';
import { PipesModule } from '../../shared/utils/pipes/pipes.module';
import { HeaderComponentModule } from '../../components/header/header.module';
import { NoticesModalPageModule } from '../notice-modal/notices_modal.module';

const routes: Routes = [
  {
    path: '',
    component: AdviserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    HeaderComponentModule,
    NoticesModalPageModule
  ],
  declarations: [AdviserPage]
})
export class AdviserPageModule {}
