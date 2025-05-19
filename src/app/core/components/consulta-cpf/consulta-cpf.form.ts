import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { clearMask } from '../../utils/generals.util';
import { FiedlConsultaCpf } from './consulta-cpf.fields';

export class ConsultaCpfForm extends FormGroup {
    private _errorMessages = {
        required: 'Campo obrigatório',
        invalidCpf: 'Campo inválido'
    };

    constructor() {
        super({
            [FiedlConsultaCpf.cpf]: new FormControl(null, [Validators.required, ConsultaCpfForm.validarCpf()])
        });
    }

    public get cpf(): AbstractControl {
        return this.get([FiedlConsultaCpf.cpf]) as AbstractControl;
    }

    public getErrorControl(controlName: string): string {
        const control = this.get(controlName);

        if (control && control.errors) {
            const errorKey = Object.keys(control.errors)[0] as keyof typeof this._errorMessages;

            return this._errorMessages[errorKey];
        }

        return '';
    }

    private static validarCpf(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const cpf = control.value;
            const isValid = cpf ? clearMask(cpf).length === 11 : false;

            return isValid ? null : { invalidCpf: true };
        };
    }
}
