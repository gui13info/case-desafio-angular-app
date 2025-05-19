import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CpfService } from './cpf.service';
import { cpfMock, cpfMockError, cpfMockErrorWithoutMessage } from '../mock/cpf.mock';

describe('CpfService', () => {
    let service: CpfService;
    let httpTestingController: HttpTestingController;

    let baseUrl: string;
    let token: string;
    let url: string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CpfService]
        });

        service = TestBed.inject(CpfService);
        httpTestingController = TestBed.inject(HttpTestingController);
        baseUrl = 'https://ws.hubdodesenvolvedor.com.br/v2/cpf/';
        token = '176382930MPKOdrmbGR318454032';
        url = `${baseUrl}?cpf=12345678901&data=null&token=${token}`;
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('(U) Deve ser criado o serviço CpfService', () => {
        expect(service).toBeTruthy();
    });

    it('(U) Deve definir os dados do CPF', () => {
        service.setDadosCpf(cpfMock);
        expect(service.getDadosCpf()).toEqual(cpfMock);
    });

    it('(U) Deve resetar o formulário', () => {
        service.resetarFormulario();
        expect(service.resetForm()).toBeTrue();
    });

    it('(U) Deve confirmar o reset do formulário', () => {
        service.confirmarReset();
        expect(service.resetForm()).toBeFalse();
    });

    it('(U) Deve buscar os dados do CPF com sucesso', () => {
        const cpf = '123.456.789-01';

        service.getDadosByCpf(cpf).subscribe((dados) => {
            expect(dados).toEqual(cpfMock);
        });

        const req = httpTestingController.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(cpfMock);
    });

    it('(U) Deve retornar erro ao buscar dados do CPF', () => {
        const cpf = '123.456.789-01';
        const errorMessage = 'Erro desconhecido';

        service.getDadosByCpf(cpf).subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error) => {
                expect(error.message).toBe(errorMessage);
            }
        });

        const req = httpTestingController.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush({ message: errorMessage, status: false }, { status: 400, statusText: 'Bad Request' });
    });

    it('(U) Deve tratar erro desconhecido corretamente', () => {
        const cpf = '123.456.789-01';

        service.getDadosByCpf(cpf).subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error) => {
                expect(error.message).toBe('Erro desconhecido');
            }
        });

        const req = httpTestingController.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.error(new ProgressEvent('Erro'));
    });

    it('(U) Deve retornar status false ao buscar dados do CPF', () => {
        const cpf = '123.456.789-01';

        service.getDadosByCpf(cpf).subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error) => {
                expect(error.message).toBe('Parametro Invalido.');
            }
        });

        const req = httpTestingController.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(cpfMockError);
    });

    it('(U) Deve retornar status false sem parâmetro de mensagem ao buscar dados do CPF', () => {
        const cpf = '123.456.789-01';

        service.getDadosByCpf(cpf).subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error) => {
                expect(error.message).toBe('Erro desconhecido');
            }
        });

        const req = httpTestingController.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(cpfMockErrorWithoutMessage);
    });
});
