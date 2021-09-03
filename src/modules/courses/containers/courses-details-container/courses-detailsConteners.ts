import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './courses-detailsConteners.html',
    styleUrls: ['courses-detailsConteners.component.scss'],
})
export class CoursesDetailsConteners implements OnInit {
    constructor() {}
    ngOnInit() {}
}
