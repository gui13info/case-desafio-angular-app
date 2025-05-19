import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StyleEnum } from '../../enums/toast.enum';
import { DadosCpfComponent } from './dados-cpf.component';
import { ToastService } from '../../services/toast.service';

describe('DadosCpfComponent', () => {
    let component: DadosCpfComponent;
    let fixture: ComponentFixture<DadosCpfComponent>;

    let toastService: ToastService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DadosCpfComponent, HttpClientModule]
        }).compileComponents();

        fixture = TestBed.createComponent(DadosCpfComponent);
        component = fixture.componentInstance;
        toastService = TestBed.inject(ToastService);
        fixture.detectChanges();
    });

    it('(U) Deve ser criado o component DadosCpfComponent', () => {
        expect(component).toBeTruthy();
    });

    it('(U) Deve chamar o serviço de mensagem ao executar o método duplicar()', () => {
        spyOn(toastService, 'showMessage');

        component.duplicar();

        expect(toastService.showMessage).toHaveBeenCalledWith('Serviço indisponível.', StyleEnum.danger);
    });
});
