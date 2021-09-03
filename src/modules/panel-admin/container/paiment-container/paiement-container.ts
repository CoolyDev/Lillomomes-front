import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-paiement-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './paiement-container.html',
    styleUrls: ['paiement-container.component.scss'],
})
export class PaiementContainer implements OnInit {
    constructor() {}
    ngOnInit() {}
}
