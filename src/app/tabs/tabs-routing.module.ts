import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'events',
        loadChildren: () => import('../pages/events/events.module').then((m) => m.EventsPageModule),
      },
      {
        path: 'people',
        loadChildren: () => import('../pages/people/people.module').then((m) => m.PeoplePageModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('../pages/chat/chat.module').then((m) => m.ChatPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/settings/settings.module').then((m) => m.SettingsPageModule),
      },
      {
        path: '',
        redirectTo: '/home/tabs/events',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/tabs/events',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
