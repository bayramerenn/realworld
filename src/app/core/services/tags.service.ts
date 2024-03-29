import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '.';



@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private apiService: ApiService) { }

  getAll(): Observable<[string]> {
    return this.apiService.get('/tags')
      .pipe(
        map(
          data => data.tags
        )
      );
  }
}
