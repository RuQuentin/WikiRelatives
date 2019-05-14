import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';

import { SearchService } from './search/search.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    ErrorComponent,
    HeaderComponent
  ],
  entryComponents: [
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
