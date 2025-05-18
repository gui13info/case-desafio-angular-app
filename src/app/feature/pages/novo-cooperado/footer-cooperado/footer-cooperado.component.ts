import { Component, OnDestroy, Signal } from '@angular/core';

import { StyleEnum } from 'src/app/core/enums/toast.enum';
import { CpfService } from 'src/app/core/services/cpf.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CpfInterface } from 'src/app/core/interfaces/cpf.interface';

@Component({
    selector: 'app-footer-cooperado',
    standalone: true,
    imports: [],
    templateUrl: './footer-cooperado.component.html',
    styleUrl: './footer-cooperado.component.scss'
})
export class FooterCooperadoComponent implements OnDestroy {
    public dadosCpf: Signal<CpfInterface>;

    constructor(
        private cpfService: CpfService,
        private toastService: ToastService
    ) {
        this.dadosCpf = this.cpfService.dadosCpf;
    }

    ngOnDestroy(): void {
        this.cpfService.resetarFormulario();
    }

    public novaAdmissao(): void {
        this.cpfService.resetarFormulario();
    }

    public dicasAdmissao(): void {
        this.toastService.showMessage('Serviço indisponível.', StyleEnum.danger);
    }
}
