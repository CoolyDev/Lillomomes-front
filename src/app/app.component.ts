import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ChildActivationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'YASMS';
  private roles: string[] = [];
  isLoggedIn = false;
  showSuperAdminComp = false;
  showAdminComp = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService,
              public router: Router, private titleService: Title) {
    this.router.events
      .pipe(filter(event => event instanceof ChildActivationEnd))
      .subscribe(event => {
        let snapshot = (event as ChildActivationEnd).snapshot;
        while (snapshot.firstChild !== null) {
          snapshot = snapshot.firstChild;
        }
        this.titleService.setTitle(snapshot.data.title || 'YASMS');
      });
  }

  ngOnInit(): void {
  }

}
