import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

export class ConsultaCpfForm extends FormGroup {
    private _errorMessages = {
        required: 'Campo obrigatório',
        invalidCpf: 'CPF inválido',
        invalidDate: 'Data inválida'
    };

    constructor() {
        super({
            cpf: new FormControl(null, [Validators.required])
        });
    }

    public get cpf(): AbstractControl {
        return this.get('cpf') as AbstractControl;
    }

    public getErrorControl(controlName: string): string {
        const control = this.get(controlName);

        if (control && control.errors) {
            const errorKey = Object.keys(control.errors)[0] as keyof typeof this._errorMessages;

            return this._errorMessages[errorKey] ?? 'Erro desconhecido';
        }

        return '';
    }
}
