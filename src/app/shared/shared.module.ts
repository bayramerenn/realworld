import { RouterModule } from '@angular/router';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './show-authed-directive.directive';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';





@NgModule({
  declarations: [
    // HeaderComponent
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    ShowAuthedDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports:[
     ShowAuthedDirective,
     ArticleListComponent,
     ArticlePreviewComponent,
     ArticleMetaComponent
  ]
})
export class SharedModule { }
