import { Component, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { StyleEnum } from '../../enums/toast.enum';
import { CpfService } from '../../services/cpf.service';
import { ToastService } from '../../services/toast.service';
import { CpfInterface } from '../../interfaces/cpf.interface';

@Component({
    selector: 'app-dados-cpf',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: './dados-cpf.component.html',
    styleUrl: './dados-cpf.component.scss'
})
export class DadosCpfComponent {
    public dadosCpf: Signal<CpfInterface>;

    constructor(
        private cpfService: CpfService,
        private toastService: ToastService
    ) {
        this.dadosCpf = this.cpfService.dadosCpf;
    }

    public duplicar(): void {
        this.toastService.showMessage('Serviço indisponível.', StyleEnum.danger);
    }
}
