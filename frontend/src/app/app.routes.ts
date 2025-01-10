import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
},{
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
},
{
    path: 'invoice/:id',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./invoice/invoice.component').then(m => m.InvoiceComponent)
},
{
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
}
];
