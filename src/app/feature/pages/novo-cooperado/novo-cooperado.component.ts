import { Component } from '@angular/core';

import { StepperComponent } from 'src/app/core/components/stepper/stepper.component';
import { DadosCpfComponent } from 'src/app/core/components/dados-cpf/dados-cpf.component';
import { ConsultaCpfComponent } from 'src/app/core/components/consulta-cpf/consulta-cpf.component';

import { FooterCooperadoComponent } from './footer-cooperado/footer-cooperado.component';

@Component({
    selector: 'app-novo-cooperado',
    standalone: true,
    imports: [StepperComponent, ConsultaCpfComponent, DadosCpfComponent, FooterCooperadoComponent],
    templateUrl: './novo-cooperado.component.html',
    styleUrl: './novo-cooperado.component.scss'
})
export class NovoCooperadoComponent {}
