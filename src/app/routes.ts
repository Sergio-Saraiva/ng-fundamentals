import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';
import {
  CreateEventComponent,
  CreateSessionComponent,
  EventDetailsComponent,
  EventResolver,
  EventsListComponent,
  EventsListResolver,
} from './events';

export const routes: Routes = [
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'],
  },
  {
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventsListResolver },
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    resolve: { event: EventResolver },
  },
  {
    path: 'events/session/new',
    component: CreateSessionComponent,
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];
