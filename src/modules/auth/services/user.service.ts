import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
        this.user = {
            id: '123',
            firstName: 'Start',
            lastName: 'Bootstrap',
            email: 'no-reply@startbootstrap.com',
        };
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }

    getSuperAdmin(): Observable<any> {
      return this.http.get(environment.USERS_API.API_ROOT_AUTH + '/displayAllUsers', { responseType: 'text' });
    }
   sendEmployeeEmail(employee: any) {
    return this.http.patch(environment.USERS_API.API_ROOT +'api/emailEmployee', employee, {responseType: 'text'})
  }
}
