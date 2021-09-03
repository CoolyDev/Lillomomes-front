import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";
import {Router} from "@angular/router";

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
  message: string | undefined;
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdminComp = false;
  private roles: string[] = [];
  username?: string;
  currentUser?:any[];

    constructor(private router:Router,public tokenStorageService:TokenStorageService,public userService: UserService) {}
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.roles=user.roles;
      this.showSuperAdminComp = this.roles.includes('ROLE_SUPER_ADMIN');
      this.showAdminComp = this.roles.includes('ROLE_ADMIN');
      this.convertRole(this.roles)
    }
  }
  convertRole (role:any){
    role.map((r:any)=>{
      switch (r) {
        case 'ROLE_SUPER_ADMIN':
          this.roles=['Super admin']
          break;
  
          case 'ROLE_ADMIN':
          this.roles=['Admin']
          break;
  
          case 'ROLE_MODERATOR':
          this.roles=['Moderator']
          break;
  
          case 'ROLE_USER':
          this.roles=['User']
          break;
      
        default:
          break;
      }
    })

}

  logout():void {
      this.router.navigateByUrl('/auth/login')
      this.tokenStorageService.signOut()
  }

}
