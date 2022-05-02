import { UserService } from './../core/services/user.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(
    private userService: UserService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
