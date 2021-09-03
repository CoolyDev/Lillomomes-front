import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './teacher-tables.component.html',
    styleUrls: ['teacher-tables.component.scss'],
})
export class TeacherTablesComponent implements OnInit {
  message: string | undefined;
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdminComp = false;
  private roles: string[] = [];
  username?: string;
  currentUser?:any[];

  constructor(private tokenStorageService:TokenStorageService) {}
    ngOnInit() {
      /*  this.tokenStorageService.currentMessage.subscribe(
    message => this.message = message,
  );
    console.log(this.message)*/
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.username = user.username;
        this.roles=user.roles;
        this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
        this.showAdminComp = this.roles.includes('ROLE_ADMIN');
        /*this.tokenStorageService.roleEmitted.subscribe( user => {
          this.currentUser?.push(user)
          this.currentUser?.map(u=>{
            this.roles=u['roles']
          })
          this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
          this.showAdminComp = this.roles.includes('ROLE_ADMIN');
        })*/
      }
    }
}
