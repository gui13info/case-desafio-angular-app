import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCpfComponent } from './dados-cpf.component';

describe('DadosCpfComponent', () => {
    let component: DadosCpfComponent;
    let fixture: ComponentFixture<DadosCpfComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DadosCpfComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DadosCpfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
