import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Word } from '../../Word';
import { Answer } from '../Answer';

@Component({
  selector: 'app-select-word',
  templateUrl: './select_word.component.html'
})
export class SelectWordComponent {
  @Input() word: Word;
  @Input() falseWords: Word[];
  @Input() guessForeingLanguage = true; // switch to write own language answer.
  @Output() answerer = new EventEmitter<Answer>();
  @Input() amountOfMultiselectChoises: number;
  @Input() show: boolean;
  choices: Word[];

  wordChanged(): void {
    console.log('wordChanged()');
    console.log(this.word);
    console.log(this.falseWords);
    this.getChoices();
  }

  getChoices() {
    this.choices = [];
    // add false choices
    for (let i = 0; i < this.falseWords.length; i++) {
      this.choices.push(this.falseWords[i]);
    }
    // push correct choice in
    this.choices.push(this.word);
    console.log(this.choices);
    // randomize order
    this.shuffleArray(this.choices);
    console.log(this.choices);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  sendAnswer(selectedAnswer: Word) {
    console.log(selectedAnswer);
    // tslint:disable-next-line:max-line-length
    this.answerer.emit(new Answer(this.guessForeingLanguage ? selectedAnswer.secondLanguageWord : selectedAnswer.firstlanguageWord, this.guessForeingLanguage));
  }

  seeRightAnswer() {
    alert('Right answer: ' + this.word.firstlanguageWord + ' = ' + this.word.secondLanguageWord);
    this.answerer.emit(new Answer('go_to_new_word', this.guessForeingLanguage));
    this.word = undefined;
    this.falseWords = undefined;
  }

}
