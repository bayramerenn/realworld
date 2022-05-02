import { User } from './../../../core/models/user.model';
import { UserService } from './../../../core/services/user.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  currentUser:User= {} as User;
  constructor(
    private userService:UserService,
    protected cd:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    )
  }

}
