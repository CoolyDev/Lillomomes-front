import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from '@modules/navigation/services';
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  message: string | undefined;
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdminComp = false;
  showUser = false;
  private roles: string[] = [];
  firstName?: string;
  lastName?:string
    constructor(private tokenStorageService :TokenStorageService,private navigationService: NavigationService) {}
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      
      this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
      this.showAdminComp = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');

      this.firstName = user.firstName;
      this.lastName = user.lastName;
      console.log(this.roles);
  
    }
    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}
