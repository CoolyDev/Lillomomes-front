import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import {AuthService} from "@modules/auth/services";
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";

@Injectable()
export class AuthGuard implements CanActivate {
    /*canActivate(): Observable<boolean> {
        return of(true);
    }*/
  constructor(private tokenStorage :TokenStorageService,
                private router:Router,private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.tokenStorage.getToken()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
