import { ActivatedRoute, provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidebarComponent, BrowserAnimationsModule],
            providers: [provideRouter([]), { provide: ActivatedRoute, useValue: {} }]
        }).compileComponents();

        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('(U) Deve ser criado o component SidebarComponent', () => {
        expect(component).toBeTruthy();
    });
});
