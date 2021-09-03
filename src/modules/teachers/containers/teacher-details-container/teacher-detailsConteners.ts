import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './teacher-detailsConteners.html',
    styleUrls: ['teacher-detailsConteners.component.scss'],
})
export class TeacherDetailsConteners implements OnInit {
    constructor() {}
    ngOnInit() {}
}
