import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    public title = 'Cooperativa de Crédito';
    public subtitle = 'Sistema de Gestão de Cooperados';
}
