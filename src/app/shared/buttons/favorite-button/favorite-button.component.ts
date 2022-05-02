import { Article } from './../../../core/models/article.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services';
import { ArticleService } from 'src/app/core/services/article.service';


@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FavoriteButtonComponent implements OnInit {

  constructor(
    private articlesService: ArticleService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() article:Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  ngOnInit() {
  }

}
