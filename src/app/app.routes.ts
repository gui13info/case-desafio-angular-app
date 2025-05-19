import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'novo-cooperado',
        loadChildren: () =>
            import('./feature/pages/novo-cooperado/novo-cooperado.routes').then((mod) => mod.NOVO_COOPERADO_ROUTES)
    },
    {
        path: 'home',
        loadChildren: () => import('./feature/pages/home/home.routes').then((mod) => mod.HOME_ROUTES)
    }
];
