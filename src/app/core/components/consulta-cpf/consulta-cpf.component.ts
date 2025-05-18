import { ReactiveFormsModule } from '@angular/forms';
import { Component, effect, signal, ViewEncapsulation } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { finalize, take } from 'rxjs';

import { ConsultaCpfForm } from './consulta-cpf.form';
import { CpfService } from '../../services/cpf.service';
import { ToastService } from '../../services/toast.service';
import { CpfInterface } from '../../interfaces/cpf.interface';
import { FiedlConsultaCpf, LabelDadosConsultaCpf } from './consulta-cpf.fields';
import { CpfMaskDirective } from '../../../../app/shared/directives/cpf-mask.directive';

@Component({
    selector: 'app-consulta-cpf',
    standalone: true,
    imports: [ReactiveFormsModule, CpfMaskDirective, MatProgressSpinnerModule],
    templateUrl: './consulta-cpf.component.html',
    styleUrl: './consulta-cpf.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ConsultaCpfComponent {
    public isLoading = signal(false);
    public dadosCpf: CpfInterface;
    public fiedlConsultaCpf = FiedlConsultaCpf;
    public labelDadosConsultaCpf = LabelDadosConsultaCpf;
    private readonly _consultaCpfForm = signal<ConsultaCpfForm>(new ConsultaCpfForm());

    constructor(
        private toastService: ToastService,
        private cpfService: CpfService
    ) {
        this.resetForm();
    }

    public get form(): ConsultaCpfForm {
        return this._consultaCpfForm();
    }

    public formInvalid(control: string): boolean {
        const formControl = this.form.get(control);
        return formControl ? formControl.invalid && formControl.touched : false;
    }

    public consultarCpf(): void {
        this.form.markAllAsTouched();

        if (this.form.valid) {
            this.isLoading.set(true);

            this.cpfService
                .getDadosByCpf(this.form.cpf.value)
                .pipe(
                    take(1),
                    finalize(() => {
                        this.isLoading.set(false);
                    })
                )
                .subscribe({
                    next: (response: CpfInterface) => {
                        this.dadosCpf = response;
                        this.cpfService.setDadosCpf(this.dadosCpf);
                    },
                    error: (error) => {
                        this.toastService.showMessage(`${error}`);
                    }
                });
        }
    }

    private resetForm(): void {
        effect(
            () => {
                if (this.cpfService.resetForm()) {
                    this.form.reset();
                    this.cpfService.confirmarReset();
                    this.cpfService.setDadosCpf(null);
                }
            },
            { allowSignalWrites: true }
        );
    }
}
