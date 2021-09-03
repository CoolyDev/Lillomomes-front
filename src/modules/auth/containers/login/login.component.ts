import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TokenStorageService} from "@modules/auth/services/tokenstorageservice.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@modules/auth/services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'sb-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed: boolean | undefined;
  errorMessage = '';
  roles: string[] = [];
  form: any = {
    email: null,
    password: null
  };
/*  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ]),
    password: new FormControl('', Validators.required),
  });*/
  authStatus: boolean | undefined;

  constructor(private router: Router,
              private authService: AuthService, private activatedRoute: ActivatedRoute,
              private tokenStorage: TokenStorageService) {

  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  onSubmit(): void {
    const {email, password} = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        if (data) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigateByUrl('/dashboard')
        }

      },
        ()=>{
          this.errorMessage="Email or password are bad"
          this.isLoginFailed = true;
          console.log(this.errorMessage)
          console.log(this.isLoginFailed)
        }
    );

  }
}
