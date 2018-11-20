
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { Word } from './Word';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable()
export class WordChangeService {
  // Observable navItem source
  private wordChange: BehaviorSubject<Word>;
  // Observable navItem stream
  navItem$ = this.wordChange.asObservable();
  // service command
  setWord(word: Word) {
    this.wordChange.next(word);
  }

}
