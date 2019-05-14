import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRelativeInfo } from '../models/relative-info.interface';
import { IPersonInfo } from '../models/person-info.interface';
import { IWikiResponse } from '../models/wiki-response.interface';

@Injectable()
export class SearchService {
  private relativesRoles: string[] = [
    'Children',
    'Spouse(s)',
    'Spouses',
    'Spouse',
    'Parent(s)',
    'Parents',
    'Parent',
    'Sibling',
    'Siblings'
  ]

  constructor(
    private http: HttpClient
  ) {}


  getPersonInfo(url, page): Observable<IWikiResponse> { // correct type
    const params = new HttpParams()
      .append('origin', '*')
      .append('action', 'parse')
      .append('format', 'json')
      .append('redirects', 'true')
      .append('prop', 'text')
      .append('section', '0')
      .append('page', page);

    return this.http.get<IWikiResponse>(`${url}/w/api.php`, { params });
  }

  collectRelatives(data, url = ''): IPersonInfo {
    const person: IPersonInfo = { name: null, relatives: null };
    const el = document.createElement('div');

    if(!data.parse) return person;

    el.innerHTML = data.parse.text['*'].replace(/<img.*?\/>/g, '');

    const infobox = el.querySelector('table, .infobox');
    person.name = infobox.querySelector('tr').textContent;

    const ths = infobox.querySelectorAll('tr > th');
    person.relatives = [];

    ths.forEach(el => {
      if (this.relativesRoles.includes(el.textContent)) {
        const values = el.nextElementSibling.querySelectorAll('a');

        values.forEach(value => {
          const href = value.getAttribute('href');

          person.relatives.push({
            role: el.textContent,
            name: value.getAttribute('title'),
            page: href.replace('/wiki/', ''),
            link: url + href,
            approved: null
          })
        })
      }
    });

    return person;
  }

  checkCounterLink(data, checkedPage) {
    const person = this.collectRelatives(data)
    return person.relatives ?
    person.relatives.some(relative => relative.page === checkedPage)
    : null;
  }

}


