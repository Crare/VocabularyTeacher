import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Word } from '../../Word';
import { Answer } from '../Answer';

@Component({
  selector: 'app-guess-word',
  templateUrl: './guess_word.component.html'
})
export class GuessWordComponent {
  @Input() word: Word;
  @Input() guessForeingLanguage = true; // switch to write own language answer.
  @Output() answerer = new EventEmitter<Answer>();
  @ViewChild('input1') inputEl1: ElementRef;
  answer: string;
  @Input() show: boolean;

  wordChanged(): void {
    console.log('wordChanged()');
    // set focus to input
    if (this.inputEl1 !== undefined) {
      this.inputEl1.nativeElement.focus();
    }
  }

  sendAnswerOnEnter(keyevent: KeyboardEvent) {
    // console.log('keyevent: ', keyevent);
    if (keyevent.key === 'Enter') {
      this.sendAnswer();
    }
  }

  sendAnswer() {
    console.log('answer: "' + this.answer + '"');
    this.answerer.emit(new Answer(this.answer, this.guessForeingLanguage));
    this.answer = '';
  }
  seeRightAnswer() {
    alert('Right answer: ' + this.word.firstlanguageWord + ' = ' + this.word.secondLanguageWord);
    this.answerer.emit(new Answer('go_to_new_word', this.guessForeingLanguage));
    this.answer = '';
  }
}
