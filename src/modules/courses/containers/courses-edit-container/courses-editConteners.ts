import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './courses-editConteners.html',
    styleUrls: ['courses-editConteners.component.scss'],
})
export class CoursesEditConteners implements OnInit {
    message: string | undefined;
    isLoggedIn = false;
    showSuperAdminComp = false;
    showAdminComp = false;
    private roles: string[] = [];
    email?: string;
    constructor(private tokenStorageService:TokenStorageService) {}
    ngOnInit() {}

}
