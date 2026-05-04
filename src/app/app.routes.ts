import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'umrah',
    loadComponent: () =>
      import('./pages/umrah/umrah-list/umrah-list.component').then(m => m.UmrahListComponent),
  },
  {
    path: 'umrah/:id',
    loadComponent: () =>
      import('./pages/umrah/umrah-detail/umrah-detail.component').then(m => m.UmrahDetailComponent),
  },
  {
    path: 'hajj',
    loadComponent: () =>
      import('./pages/hajj/hajj-list/hajj-list.component').then(m => m.HajjListComponent),
  },
  {
    path: 'hajj/:id',
    loadComponent: () =>
      import('./pages/hajj/hajj-detail/hajj-detail.component').then(m => m.HajjDetailComponent),
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./pages/jobs/jobs-list/jobs-list.component').then(m => m.JobsListComponent),
  },
  {
    path: 'jobs/:id',
    loadComponent: () =>
      import('./pages/jobs/job-detail/job-detail.component').then(m => m.JobDetailComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin/admin.component').then(m => m.AdminComponent),
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./pages/admin/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
