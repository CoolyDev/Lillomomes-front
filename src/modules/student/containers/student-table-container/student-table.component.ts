import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './student-table.component.html',
    styleUrls: ['student-table.component.scss'],
})
export class StudentTableContainer implements OnInit {
    constructor() {}
    ngOnInit() {}
}
