import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@modules/auth/services/tokenstorageservice.service';

@Component({
  selector: 'sb-employees-container',
  templateUrl: './employees-profil.component.html',
  styleUrls: ['./employees-profil.component.scss']
})
export class EmployeesProfilContainer implements OnInit {
  isLoggedIn = false;
  username?: string;
  private roles: string[] = [];
  constructor(private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.roles=user.roles;
    }
  }
}
