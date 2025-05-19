import { NavigationStart, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let routerMock: Partial<Router>;

    beforeEach(async () => {
        routerMock = {
            events: of(new NavigationStart(1, '/novo-cooperado'))
        };

        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [{ provide: Router, useValue: routerMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('(U) Deve ser criado o component HeaderComponent', () => {
        expect(component).toBeTruthy();
    });

    it('(U) Deve atualizar o título e o subtítulo ao mudar de rota para NOVO_COOPERADO', () => {
        component.ngOnInit();
        expect(component.title).toBe('NOVA ADMISSÃO COOPERADO');
        expect(component.subtitle).toBe('Cadastro / Admissão do Cooperado / Nova Admissão de Cooperado');
    });

    it('(U) Deve retornar o título padrão ao chamar getTitle com rota inválida', () => {
        const title = component.getTitle('rota-invalida');
        expect(title).toBe('COOPERATIVA DE CRÉDITO');
    });

    it('(U) Deve retornar o subtítulo padrão ao chamar getSubtitle com rota inválida', () => {
        const subtitle = component.getSubtitle('rota-invalida');
        expect(subtitle).toBe('Sistema de Gestão de Cooperados');
    });

    it('(U) Deve cancelar a inscrição ao destruir o componente', () => {
        spyOn(component['routeSubscription'], 'unsubscribe');

        component.ngOnDestroy();

        expect(component['routeSubscription'].unsubscribe).toHaveBeenCalled();
    });
});
