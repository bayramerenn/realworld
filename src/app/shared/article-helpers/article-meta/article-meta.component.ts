import { Article } from './../../../core/models/article.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css']
})
export class ArticleMetaComponent {

  @Input() article:Article;
}
