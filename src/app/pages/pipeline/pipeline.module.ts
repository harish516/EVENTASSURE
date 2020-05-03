import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PipelinePage } from './pipeline.page';
import { PipesModule } from 'src/app/shared/utils/pipes/pipes.module';
import { NoticesModalPageModule } from '../notice-modal/notices_modal.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { SortByComponentModule } from 'src/app/components/sort-by/sort-by.module';
import { SortByComponent } from 'src/app/components/sort-by/sort-by.component';
import { FilterByComponentModule } from 'src/app/components/filter-by/filter-by.module';

const routes: Routes = [
  {
    path: '',
    component: PipelinePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NoticesModalPageModule,
    HeaderComponentModule,
    FilterByComponentModule,
    SortByComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipelinePage],
  entryComponents: [SortByComponent]
})
export class PipelinePageModule { }
