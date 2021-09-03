import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './teacher-editConteners.html',
    styleUrls: ['teacher-editConteners.component.scss'],
})
export class TeacherEditConteners implements OnInit {
    message: string | undefined;
    isLoggedIn = false;
    showSuperAdminComp = false;
    showAdminComp = false;
    private roles: string[] = [];
    email?: string;
    constructor(private tokenStorageService:TokenStorageService) {}
    ngOnInit() {}

}
