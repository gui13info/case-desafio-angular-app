import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appCpfMask]',
    standalone: true
})
export class CpfMaskDirective {
    constructor(private el: ElementRef<HTMLInputElement>) {}

    @HostListener('input', ['$event'])
    onInput(): void {
        const input = this.el.nativeElement;
        let cleaned = input.value.replace(/\D+/g, '');

        if (cleaned.length > 11) {
            cleaned = cleaned.slice(0, 11);
        }

        input.value = this.formatCpf(cleaned);
    }

    private formatCpf(value: string): string {
        if (value.length <= 3) return value;
        if (value.length <= 6) return `${value.slice(0, 3)}.${value.slice(3)}`;
        if (value.length <= 9) return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
        return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
    }
}
