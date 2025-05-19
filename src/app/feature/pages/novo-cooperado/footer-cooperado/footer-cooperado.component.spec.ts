import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cpfMock } from 'src/app/core/mock/cpf.mock';
import { StyleEnum } from 'src/app/core/enums/toast.enum';
import { CpfService } from 'src/app/core/services/cpf.service';
import { ToastService } from 'src/app/core/services/toast.service';

import { FooterCooperadoComponent } from './footer-cooperado.component';

describe('FooterCooperadoComponent', () => {
    let component: FooterCooperadoComponent;
    let fixture: ComponentFixture<FooterCooperadoComponent>;

    let cpfService: jasmine.SpyObj<CpfService>;
    let toastService: jasmine.SpyObj<ToastService>;

    beforeEach(async () => {
        const cpfServiceSpy = jasmine.createSpyObj('CpfService', ['resetarFormulario'], {
            dadosCpf: signal(cpfMock)
        });
        const toastServiceSpy = jasmine.createSpyObj('ToastService', ['showMessage']);

        await TestBed.configureTestingModule({
            imports: [FooterCooperadoComponent],
            providers: [
                { provide: CpfService, useValue: cpfServiceSpy },
                { provide: ToastService, useValue: toastServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FooterCooperadoComponent);
        component = fixture.componentInstance;
        cpfService = TestBed.inject(CpfService) as jasmine.SpyObj<CpfService>;
        toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
        fixture.detectChanges();
    });

    it('(U) Deve ser criado o componente FooterCooperadoComponent', () => {
        expect(component).toBeTruthy();
    });

    it('(U) Deve chamar resetarFormulario no ngOnDestroy', () => {
        component.ngOnDestroy();
        expect(cpfService.resetarFormulario).toHaveBeenCalled();
    });

    it('(U) Deve chamar resetarFormulario no método novaAdmissao()', () => {
        component.novaAdmissao();
        expect(cpfService.resetarFormulario).toHaveBeenCalled();
    });

    it('(U) Deve exibir mensagem de serviço indisponível no método dicasAdmissao()', () => {
        component.dicasAdmissao();
        expect(toastService.showMessage).toHaveBeenCalledWith('Serviço indisponível.', StyleEnum.danger);
    });
});
