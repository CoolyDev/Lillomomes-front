import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employee-detailsConteners.html',
    styleUrls: ['employee-detailsConteners.component.scss'],
})
export class EmployeeDetailsConteners implements OnInit {
    constructor() {}
    ngOnInit() {}
}
