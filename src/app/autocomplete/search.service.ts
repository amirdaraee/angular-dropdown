import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResult } from './api-result.model';

const API_URL = 'https://api.first.org/data/v1/countries';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    const queryUrl = `${API_URL}?q=${query}`;
    return this.http
      .get<ApiResult>(queryUrl, { headers: header, observe: 'response' })
      .pipe(
        map((response) =>
          Object.values(response.body.data).map((k) => k.country)
        )
      );
  }
}
