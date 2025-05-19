import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, BrowserAnimationsModule],
            providers: [provideRouter([]), { provide: ActivatedRoute, useValue: {} }]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('(U) Deve ser criado o component AppComponent', () => {
        expect(component).toBeTruthy();
    });
});
