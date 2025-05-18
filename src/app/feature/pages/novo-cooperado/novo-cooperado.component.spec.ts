import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCooperadoComponent } from './novo-cooperado.component';

describe('NovoCooperadoComponent', () => {
    let component: NovoCooperadoComponent;
    let fixture: ComponentFixture<NovoCooperadoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NovoCooperadoComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NovoCooperadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
