import { Component, Input } from '@angular/core';

import { IPersonInfo } from '../models/person-info.interface';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.scss']
})
export class ResultsComponent {

  @Input() listOfRelatives: any[];
  @Input() personInfo: IPersonInfo = { name: null, relatives: null};

  headers: string[] = [
    'name',
    'role',
    'approved'
  ]

  navigateHref(link) {
    window.open(link);
  }
}