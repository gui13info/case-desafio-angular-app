import { of, throwError } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { cpfMock } from '../../mock/cpf.mock';
import { ConsultaCpfForm } from './consulta-cpf.form';
import { CpfService } from '../../services/cpf.service';
import { ToastService } from '../../services/toast.service';
import { ConsultaCpfComponent } from './consulta-cpf.component';

describe('ConsultaCpfComponent', () => {
    let component: ConsultaCpfComponent;
    let fixture: ComponentFixture<ConsultaCpfComponent>;

    let cpfService: CpfService;
    let resetFormSignal: WritableSignal<boolean>;
    let cpfServiceMock: jasmine.SpyObj<CpfService>;
    let toastServiceMock: jasmine.SpyObj<ToastService>;

    beforeEach(waitForAsync(() => {
        resetFormSignal = signal(false);

        cpfServiceMock = {
            getDadosByCpf: jasmine.createSpy('getDadosByCpf'),
            setDadosCpf: jasmine.createSpy('setDadosCpf'),
            confirmarReset: jasmine.createSpy('confirmarReset'),
            resetForm: resetFormSignal
        } as unknown as jasmine.SpyObj<CpfService>;

        toastServiceMock = jasmine.createSpyObj('ToastService', ['showMessage']);

        TestBed.configureTestingModule({
            imports: [ConsultaCpfComponent],
            providers: [
                { provide: CpfService, useValue: cpfServiceMock },
                { provide: ToastService, useValue: toastServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ConsultaCpfComponent);
        component = fixture.componentInstance;
        cpfService = TestBed.inject(CpfService);
        fixture.detectChanges();
    }));

    it('(U) Deve ser criado o component ConsultaCpfComponent', () => {
        expect(component).toBeTruthy();
    });

    it('(U) Deve marcar o formulário quando consultarCpf() for chamado', () => {
        spyOn(component.form, 'markAllAsTouched');
        component.consultarCpf();
        expect(component.form.markAllAsTouched).toHaveBeenCalled();
    });

    it('(U) Deve chamar cpfService.getDadosByCpf e setDadosCpf quando for sucesso', () => {
        const form = component.form as ConsultaCpfForm;
        cpfServiceMock.getDadosByCpf.and.returnValue(of(cpfMock));
        form.cpf.setValue('123.751.242-60');
        spyOnProperty(form, 'valid').and.returnValue(true);

        component.consultarCpf();

        expect(cpfServiceMock.getDadosByCpf).toHaveBeenCalledWith(component.form.cpf.value);

        setTimeout(() => {
            expect(component.dadosCpf).toEqual(cpfMock);
            expect(cpfServiceMock.setDadosCpf).toHaveBeenCalledWith(cpfMock);
            expect(component.isLoading()).toBeFalse();
        }, 0);
    });

    it('(U) Deve mostrar mensagem de erro em cpfService.getDadosByCpf', () => {
        const errorMsg = 'Erro na consulta';
        cpfServiceMock.getDadosByCpf.and.returnValue(throwError(() => new Error(errorMsg)));
        const form = component.form as ConsultaCpfForm;
        spyOnProperty(form, 'valid').and.returnValue(true);

        component.consultarCpf();

        setTimeout(() => {
            expect(toastServiceMock.showMessage).toHaveBeenCalledWith(jasmine.stringMatching(errorMsg));
            expect(component.isLoading()).toBeFalse();
        }, 0);
    });

    it('(U) Deve retornar false no método formInvalid()', () => {
        const controlName = 'cpf';
        expect(component.formInvalid(controlName)).toBeFalse();
    });

    it('(U) Deve retornar false no método formInvalid()', () => {
        const controlName = 'teste';
        expect(component.formInvalid(controlName)).toBeFalse();
    });

    it('(U) Deve resetar o formulário e chamar os métodos do serviço quando cpfService.resetForm() retornar true', fakeAsync(() => {
        spyOn(component.form, 'reset').and.callThrough();

        cpfService.resetForm.set(true);

        tick();

        expect(component.form.reset).toHaveBeenCalled();
        expect(cpfService.confirmarReset).toHaveBeenCalled();
        expect(cpfService.setDadosCpf).toHaveBeenCalledWith(null);
    }));

    it('(U) Deve testar o método getErrorControl() do ConsultaCpfForm', () => {
        const form = component.form as ConsultaCpfForm;

        expect(form.getErrorControl('cpf')).toBe('Campo obrigatório');
        expect(form.getErrorControl('data')).toBe('');
    });
});
