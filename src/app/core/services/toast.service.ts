import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StyleEnum } from '../enums/toast.enum';
import { ToastInterface } from '../interfaces/toast.interface';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastMessage: ToastInterface | null = null;

    constructor(private snackBar: MatSnackBar) {}

    public showMessage(message: string, type: StyleEnum = StyleEnum.danger, duration = 3000) {
        this.toastMessage = { message, type, duration };
        this.displayMessage();
    }

    private displayMessage(): void {
        if (this.toastMessage) {
            this.snackBar.open(this.toastMessage.message, '', {
                duration: this.toastMessage.duration,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: [`toast-${this.toastMessage.type}`]
            });

            this.toastMessage = null;
        }
    }
}
