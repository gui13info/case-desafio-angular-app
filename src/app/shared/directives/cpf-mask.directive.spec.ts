import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfMaskDirective } from './cpf-mask.directive';

@Component({
    template: `<input type="text" appCpfMask />`
})
class TestComponent {}

describe('CpfMaskDirective', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CpfMaskDirective],
            declarations: [TestComponent]
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('(U) Deve formatar CPF corretamente com 11 dígitos', () => {
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.value = '12345678901';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputElement.value).toBe('123.456.789-01');
    });

    it('(U) Deve truncar CPF com mais de 11 dígitos', () => {
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.value = '12345678901234';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputElement.value).toBe('123.456.789-01');
    });

    it('(U) Deve formatar CPF com 6 dígitos', () => {
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.value = '123456';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputElement.value).toBe('123.456');
    });

    it('(U) Deve formatar CPF com 9 dígitos', () => {
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.value = '123456789';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputElement.value).toBe('123.456.789');
    });

    it('(U) Deve manter o valor original para menos de 3 dígitos', () => {
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.value = '12';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputElement.value).toBe('12');
    });
});
