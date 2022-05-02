import { ArticleService } from './../core/services/article.service';
import { ArticleListConfig } from './../core/models/article-list-config.model';
import { UserService } from './../core/services/user.service';
import { TagsService } from './../core/services/tags.service';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;

  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private article:ArticleService
  ) { }

  ngOnInit(): void {

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated) {
          //kaldir
          this.setListTo('all');
        } else {
          this.setListTo('all');
        }
        this.cd.markForCheck();
      }
    );

    this.tagsService.getAll().subscribe(
      tags => {
        this.tags = tags;
        this.tagsLoaded = true;
        this.cd.markForCheck();
      }
    )
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  setListTo(type: string = '', filters: object = {}) {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listConfig = { type, filters };
    console.log(filters);
    console.log(this.listConfig);
  }
}
