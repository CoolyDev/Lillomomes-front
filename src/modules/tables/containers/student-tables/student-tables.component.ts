import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './student-tables.component.html',
    styleUrls: ['student-tables.component.scss'],
})
export class StudentTablesComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
