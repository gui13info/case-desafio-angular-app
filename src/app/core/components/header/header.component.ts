import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Event, NavigationStart, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { RotasEnum } from '../../enums/rotas.enum';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
    public title: string;
    public subtitle: string;
    private routeSubscription: Subscription;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.routeSubscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                const rota: string = event.url.replace('/', '');
                this.title = this.getTitle(rota);
                this.subtitle = this.getSubtitle(rota);
            }
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    public getTitle(rota: string): string {
        const rotas = {
            [RotasEnum.NOVO_COOPERADO]: 'NOVA ADMISSÃO COOPERADO',
            default: 'COOPERATIVA DE CRÉDITO'
        };

        return rotas[rota] || rotas.default;
    }

    public getSubtitle(rota: string): string {
        const rotas = {
            [RotasEnum.NOVO_COOPERADO]: 'Cadastro / Admissão do Cooperado / Nova Admissão de Cooperado',
            default: 'Sistema de Gestão de Cooperados'
        };

        return rotas[rota] || rotas.default;
    }
}
