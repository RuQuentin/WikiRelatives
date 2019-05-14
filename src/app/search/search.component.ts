import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SearchService } from '../search/search.service';

import { map, switchMap, tap, mergeMap, concatMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { IPersonInfo } from '../models/person-info.interface';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent {
  @Output() person = new EventEmitter;
  @Output() error = new EventEmitter;

  private link = new FormControl;

  
  constructor(
    private searchService: SearchService
  ) {}


  checkPerson(): void {
    this.person.emit(false);
    this.error.emit(false);

    const [ url, page ] = this.link.value.split('/wiki/');

    this.searchService.getPersonInfo(url, page)
      .pipe(
        map(pageContent => this.searchService.collectRelatives(pageContent, url)),
        switchMap(person => 
          forkJoin(person.relatives.map(relative =>
            this.searchService.getPersonInfo(url, relative.page)
              .pipe(
                map(pageContent => {
                    relative.approved = this.searchService.checkCounterLink(pageContent, page);
                    return relative
                  })
              )
          )),
          (person) => person
        )
      )
      .subscribe(
        data => this.person.emit(data),
        err => {
          console.log(err)
          this.error.emit(err)
        }
      )
  }


}
