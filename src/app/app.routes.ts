import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
},{
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
}
];
