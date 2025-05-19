import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCooperadoComponent } from './novo-cooperado.component';

describe('NovoCooperadoComponent', () => {
    let component: NovoCooperadoComponent;
    let fixture: ComponentFixture<NovoCooperadoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NovoCooperadoComponent, HttpClientModule]
        }).compileComponents();

        fixture = TestBed.createComponent(NovoCooperadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('(U) Deve ser criado o component NovoCooperadoComponent', () => {
        expect(component).toBeTruthy();
    });
});
