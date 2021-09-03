import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Employees} from "@modules/employees/models";
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    constructor() {}
    ngOnInit() {

      }
}
