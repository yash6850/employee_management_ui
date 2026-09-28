import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'register',
        loadComponent: () =>
            import('./register/register').then(m => m.Register)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login').then(m => m.Login)
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'employees',
        loadComponent: () =>
            import('./employees/employees').then(m => m.Employees)
    },
    {
        path: 'leave',
        loadComponent: () =>
            import('./leave/leave').then(m => m.Leave)
    },
    {
        path: 'tasks',
        loadComponent: () =>
            import('./tasks/tasks').then(m => m.Tasks)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'

    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
