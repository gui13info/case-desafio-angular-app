import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'novo-cooperado',
        loadChildren: () =>
            import('./feature/pages/novo-cooperado/novo-cooperado.routes').then((mod) => mod.NOVO_COOPERADO_ROUTES)
    }
];
