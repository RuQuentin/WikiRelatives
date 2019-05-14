import { Component } from '@angular/core';

import { ResultsComponent } from './results/results.component';

import { IPersonInfo } from './models/person-info.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'TestCheckRelatives';
  private person: IPersonInfo;
  private error: string;

  private ResultsComponent = null;

  setPerson(person) {
    this.person = person;
  }

  setError(err) {
    this.error = err;
  }
}
