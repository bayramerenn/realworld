import { Article } from './../../../core/models/article.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent  {

@Input() article:Article;

trackByFn(index:number,item:any){
  return index;
}

onToggleFavorite(favorited:boolean){
  this.article['favorited'] = favorited;
  if (favorited) {
    this.article['favoritesCount']++;
  } else {
    this.article['favoritesCount']--;
  }
}

}
