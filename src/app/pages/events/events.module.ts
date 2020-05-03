import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ChartsModule } from 'ng2-charts-x';
import { HeaderComponentModule } from '../../components/header/header.module';
import { CreateEventPage } from './create/create-event.page';
import { EventDetailsPage } from './event-details/event-details.page';
import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage,
  },
  {
    path: 'create',
    component: CreateEventPage,
  },
  {
    path: ':id',
    component: EventDetailsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule,
    ReactiveFormsModule,
    RoundProgressModule,
    ChartsModule,
  ],
  declarations: [EventsPage, EventDetailsPage, CreateEventPage],
})
export class EventsPageModule {}
