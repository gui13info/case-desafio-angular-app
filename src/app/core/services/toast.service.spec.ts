import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToastService } from './toast.service';
import { StyleEnum } from '../enums/toast.enum';

describe('ToastService', () => {
    let service: ToastService;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

        TestBed.configureTestingModule({
            providers: [ToastService, { provide: MatSnackBar, useValue: snackBarMock }]
        });

        service = TestBed.inject(ToastService);
        snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    });

    it('(U) Deve ser criado o serviço ToastService', () => {
        expect(service).toBeTruthy();
    });

    it('(U) Deve exibir uma mensagem de sucesso', () => {
        const mensagem = 'Operação realizada com sucesso!';

        service.showMessage(mensagem, StyleEnum.success);

        expect(snackBarSpy.open).toHaveBeenCalledWith(mensagem, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['toast-success']
        });
    });

    it('(U) Deve exibir uma mensagem de erro com duração personalizada', () => {
        const mensagem = 'Erro ao realizar operação!';
        const duracao = 5000;

        service.showMessage(mensagem, StyleEnum.danger, duracao);

        expect(snackBarSpy.open).toHaveBeenCalledWith(mensagem, '', {
            duration: duracao,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['toast-danger']
        });
    });

    it('(U) Deve exibir uma mensagem com estilização de erro', () => {
        const mensagem = 'Erro ao realizar operação!';

        service.showMessage(mensagem);

        expect(snackBarSpy.open).toHaveBeenCalledWith(mensagem, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['toast-danger']
        });
    });

    it('(U) Não deve exibir mensagem quando não há mensagem configurada', () => {
        expect(snackBarSpy.open).not.toHaveBeenCalled();
    });
});
