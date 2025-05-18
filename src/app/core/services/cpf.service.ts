import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { clearMask } from '../utils/generals.util';
import { CpfInterface } from '../interfaces/cpf.interface';
@Injectable({
    providedIn: 'root'
})
export class CpfService {
    public dadosCpf = signal<CpfInterface>(null);
    public resetForm = signal<boolean>(false);
    private readonly baseUrl = 'https://ws.hubdodesenvolvedor.com.br/v2/cpf/';
    private readonly token = '176290420ceoUmyETqG318287008';

    constructor(private http: HttpClient) {}

    public setDadosCpf(dados: CpfInterface) {
        this.dadosCpf.set(dados);
    }

    public getDadosCpf() {
        return this.dadosCpf();
    }

    public resetarFormulario() {
        this.resetForm.set(true);
    }

    public confirmarReset() {
        this.resetForm.set(false);
    }

    public getDadosByCpf(cpf: string): Observable<CpfInterface> {
        const url = `${this.baseUrl}?cpf=${clearMask(cpf)}&data=${null}&token=${this.token}`;

        return this.http.get<CpfInterface>(url).pipe(
            map((response) => {
                if (!response.status) {
                    throw new Error(response.message || 'Erro desconhecido');
                }
                return response;
            }),
            catchError((error) => this.handleError(error))
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        return throwError(() => new Error(errorMessage));
    }
}
