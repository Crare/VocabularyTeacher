import { SelectWordComponent } from './input/tester/select_word/select_word.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputWordsComponent } from './input/input-words.component';
import { HelperExampleComponent } from './helper_example/helper-example.component';
import { GuessWordComponent } from './input/tester/guess_word/guess_word.component';
import { TesterComponent } from './input/tester/tester.component';

@NgModule({
  declarations: [
    AppComponent,
    InputWordsComponent,
    HelperExampleComponent,
    TesterComponent,
    GuessWordComponent,
    SelectWordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
