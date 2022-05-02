import { HttpParams } from '@angular/common/http';

import { Article } from './../models/article.model';
import { Observable, map } from 'rxjs';
import { ArticleListConfig } from './../models/article-list-config.model';
import { Injectable, Type } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private apiService: ApiService
  ) { }

  query(config: ArticleListConfig): Observable<{ articles: Article[], articlesCount: number }> {


    let mp = new Map();
    Object.keys(config.filters)
      .forEach((key) => {
        mp.set(key, config.filters[key as keyof typeof config.filters]);


      });

    const params = Object.fromEntries(mp);

    console.log(config.type);
    return this.apiService
      .get('/articles' + ((config.type === 'feed') ? '/feed' : ''),
        new HttpParams({ fromObject: params }))

  }

  get(slug:string):Observable<Article>{
    return this.apiService.get('/articles/'+slug)
    .pipe(map(data => data.article));
  }

  destroy(slug:string){
    return this.apiService.delete('/articles/'+slug);
  }

  save(article:Article):Observable<Article>{
    if(article.slug){
      return this.apiService.put('/articles/'+article.slug,{article})
                .pipe(map(data => data.article));
    }else{
      return this.apiService.post('/articles/',{article:article})
              .pipe(map(data => data.article));
    }
  }

  favorite(slug:string):Observable<Article>{
    return this.apiService.post('/articles/'+slug+'/favorite');
  }

  unfavorite(slug:string):Observable<string>{
    return this.apiService.delete('/articles/'+'slug'+'/favorite');
  }
}
