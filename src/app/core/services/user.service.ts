
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, ReplaySubject, Observable, map } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(
    {
      username: "Bayram",
      email: "b@gmail.com",
      image: "https://media-exp1.licdn.com/dms/image/D4D03AQHdwb-VAyMo6g/profile-displayphoto-shrink_400_400/0/1644834211277?e=1657152000&v=beta&t=LpZum8RlzSoO_kGWCYtj2HN-tLaIUVBaFQyfk0FIZSs"
    } as User)
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged())

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) {
    //kaldir
    this.isAuthenticatedSubject.next(true)
  }

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          {
            next: (data) => this.setAuth(data),
            error: () => this.purgeAuth()
          }
        );
    } else {
      this.purgeAuth();
    }
  }
  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(type: string, credentials: string): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post(`/users${route}`, { user: credentials })
      .pipe(
        map(
          (data: any) => {
            this.setAuth(data.user)
            return data;
          }
        ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update(user: User): Observable<User> {
    return this.apiService.put('/user', { user })
      .pipe(
        map(
          (data: any) => {
            this.currentUserSubject.next(data.user);
            return data.user;
          }
        )
      )
  }
}
