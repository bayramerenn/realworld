import { ArticleListConfig } from './../../../core/models/article-list-config.model';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { ArticleService } from 'src/app/core/services/article.service';
import { Article } from 'src/app/core/models';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {


  constructor(
    private articlesService: ArticleService,
    private cd: ChangeDetectorRef
  ) { }

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: ArticleListConfig;
  results: Article[];
  currentPage = 1;
  loading: boolean = false;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  trackByFn(index: number, name: any): number {
    return index;
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = (this.limit * (this.currentPage - 1))
    }

    this.articlesService.query(this.query)
      .subscribe(data => {
        console.log(data,'data');
        this.loading = false;
        this.results = data.articles

        this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)),
          (val, index) => index + 1);
        this.cd.markForCheck();
      })
  }

}
