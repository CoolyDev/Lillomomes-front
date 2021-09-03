import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-student-detail',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './student-details-container.html',
    styleUrls: ['student-details-container.component.scss'],
})
export class StudentsDetailsContainer implements OnInit {
    constructor() {}
    ngOnInit() {}
}
