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
    path: 'study-abroad',
    loadComponent: () =>
      import('./pages/study-abroad/study-abroad-list/study-abroad-list.component').then(m => m.StudyAbroadListComponent),
  },
  {
    path: 'study-abroad/:id',
    loadComponent: () =>
      import('./pages/study-abroad/study-abroad-detail/study-abroad-detail.component').then(m => m.StudyAbroadDetailComponent),
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
