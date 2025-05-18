import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCooperadoComponent } from './footer-cooperado.component';

describe('FooterCooperadoComponent', () => {
    let component: FooterCooperadoComponent;
    let fixture: ComponentFixture<FooterCooperadoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FooterCooperadoComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FooterCooperadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
