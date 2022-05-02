import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [];

@NgModule({
  imports: [
     QuicklinkModule,
    RouterModule.forRoot(routes
       ,{
     preloadingStrategy:QuicklinkStrategy
   }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
