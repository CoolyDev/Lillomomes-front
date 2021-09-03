import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export interface UserCredential {
  email: string,
  password: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

  isAuth = false;
  constructor(private http: HttpClient) {
  }

  getAuth$(): Observable<{}> {
    return of({});
  }
/*
  signIn() {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(environment.USERS_API.API_ROOT_AUTH+'api/auth/loginUser').subscribe(
          (Response)=>{
            this.isAuth = false;
            resolve(this.bintab = Response);
          },(error)=>{
            reject(error);
            console.log("Erreur");
          }
        );
      }
    );
  }*/
  login(email: string, password: string): Observable<any> {
    this.isAuth = true;
    return this.http.post(environment.USERS_API.API_ROOT_AUTH + 'loginUser', {
      email,
      password
    }, httpOptions);
  }
  signOut() {
    this.isAuth = false;
  }
}
