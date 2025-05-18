import { effect, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StyleEnum } from '../enums/toast.enum';
import { ToastInterface } from '../interfaces/toast.interface';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private _toast = signal<ToastInterface>(null);
    public readonly toast = this._toast.asReadonly();

    constructor(private snackBar: MatSnackBar) {
        effect(() => {
            const msg = this.toast();
            if (msg) {
                this.snackBar.open(msg.message, '', {
                    duration: msg.duration ?? 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: [`toast-${msg.type}`]
                });
            }
        });
    }

    public showMessage(message: string, type: StyleEnum = StyleEnum.danger, duration = 3000) {
        this._toast.set({ message, type, duration });
    }
}
