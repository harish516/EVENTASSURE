import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveFilterPipe } from './active-filter.pipe';

@NgModule({
  declarations: [ActiveFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [ActiveFilterPipe],
})
export class PipesModule { }

