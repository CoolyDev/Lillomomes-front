import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-inscription-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './inscription-container.html',
    styleUrls: ['inscription-container.component.scss'],
})
export class InscriptionContainer implements OnInit {
    constructor() {}
    ngOnInit() {}
}
