import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faUserGraduate, faClock, faStopwatch, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    faUserGraduate = faUserGraduate;
    faClock=faClock;
    faStopwatch=faStopwatch;
    faChalkboardTeacher=faChalkboardTeacher
    constructor() {}
    ngOnInit() {}
}
