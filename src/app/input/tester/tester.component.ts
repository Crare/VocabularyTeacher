import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Word } from '../Word';
import { Answer } from './Answer';
import { GuessWordComponent } from './guess_word/guess_word.component';
import { SelectWordComponent } from './select_word/select_word.component';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
})
export class TesterComponent implements OnInit {
  @Input() words: Word[];
  @Input() amountOfTimesWordCorrect: number;
  @Input() amountOfMultiselectChoises: number;
  @Output() test_result_emitter = new EventEmitter();
  wordsTodo: Word[];
  selectedWord: Word;
  lastSelectedWord: Word;
  answer: string;
  showGuessWord = false;
  showSelectWord = false;
  guessForeingLanguage = true;
  @ViewChild('quess_word') quess_word: GuessWordComponent;
  @ViewChild('select_word') select_word: SelectWordComponent;
  testingDone = false;
  falseWords: Word[];
  averageScore: number = null;
  totalScore: number;
  duration: string;
  startTime: Date;
  @Input() useOnlyGuessWords: boolean;
  @Input() everySecondGuessWord: boolean;

  ngOnInit(): void {
    this.startTime = new Date();
    console.log('everySecondGuessWord: ' + this.everySecondGuessWord);
    this.wordsTodo = Object.assign([], this.words); // clone array
    if (this.everySecondGuessWord && this.showGuessWord === this.showSelectWord) {
      this.showGuessWord = !this.showGuessWord;
    }
    this.getRandomWord();
  }

  getRandomWord() {
    if (this.wordsTodo.length === 0) {
      this.testingDone = true;
      this.calculateScore();
    } else {
      if (this.selectedWord !== this.lastSelectedWord) {
        this.lastSelectedWord = this.selectedWord;
      }
      // select random word
      let randomIndex = Math.round((Math.random() * (this.wordsTodo.length - 1)));
      this.selectedWord = this.wordsTodo[randomIndex];
      console.log('wordindex randomIndex: ', randomIndex);
      console.log('selectedWord: ', this.selectedWord);

      // select component to view it
      if (!this.useOnlyGuessWords && !this.everySecondGuessWord) {
        randomIndex = Math.round(Math.random()); // TODO: this when we have multiple components
        console.log('guessWord/selectWord randomIndex: ', randomIndex);
        switch (randomIndex) {
          case 0:
            this.showGuessWord = true;
            this.showSelectWord = false;
            break;
          case 1:
            this.showGuessWord = false;
            this.showSelectWord = true;
            break;
          default:
            console.error('unknown index');
        }
      } else if (this.everySecondGuessWord) {
        // set every other to guessword puzzle and other to selectword puzzle
        this.showGuessWord = !this.showGuessWord;
        this.showSelectWord = !this.showSelectWord;
        console.log('showGuessWord: ' + this.showGuessWord);
        console.log('showSelectWord: ' + this.showSelectWord);
      }
      // randomly toggle which language need to add to the input.
      // randomIndex = Math.round(Math.random());
      // console.log('guessforeignlanguage randomIndex: ', randomIndex);
      // if (randomIndex === 0) {
      this.guessForeingLanguage = !this.guessForeingLanguage;
      // } else {
      //   this.guessForeingLanguage = true;
      // }
      // try to get different word everytime.<
      if (this.lastSelectedWord === this.selectedWord && this.wordsTodo.length > 1) {
        this.getRandomWord();
      } else {
        // new word
        setTimeout(() => {
          if (this.showGuessWord) {
            this.quess_word.wordChanged();
          } else {
            this.getFalseWords(this.selectedWord, () => {
              this.select_word.wordChanged();
            });
          }
        }, 100);
      }

      console.log('wordsTodo: ', this.wordsTodo);
    }
  }

  getFalseWords(rightWord: Word, callback) {
    this.falseWords = new Array<Word>();
    while (this.falseWords.length < this.amountOfMultiselectChoises) {
      const randomIndex = Math.round(Math.random() * this.words.length);
      if (this.words[randomIndex] !== rightWord) {
        this.falseWords.push(this.words[randomIndex]);
      }
    }
    console.log(this.falseWords);
    setTimeout(() => {
      callback();
    }, 100);
  }

  sendAnswer(answer: Answer) {
    this.falseWords = undefined;
    console.log('answer: ', answer);
    console.log('selectedWord: ', this.selectedWord);

    if ((answer.guessForeingLanguage && answer.word === this.selectedWord.secondLanguageWord) ||
        (!answer.guessForeingLanguage && answer.word === this.selectedWord.firstlanguageWord)) {
      console.log('correct!');
      this.test_result_emitter.emit(true);
      for (let i = 0; i < this.wordsTodo.length; i++) {
        if (this.wordsTodo[i] === this.selectedWord) {
          // add to right times
          this.wordsTodo[i].gotRightTimes += 1;
          this.updateWordResults(this.wordsTodo[i]);
          if (this.wordsTodo[i].gotRightTimes >= this.amountOfTimesWordCorrect) {
            // remove word from wordsTodo, if enough times
            console.log('removing word from todo: ', this.wordsTodo[i]);
            this.wordsTodo.splice(i, 1);
          }
          break;
        }
      }
    } else if (answer.word === 'go_to_new_word') {
      for (let i = 0; i < this.wordsTodo.length; i++) {
        if (this.wordsTodo[i] === this.selectedWord) {
          // add to wrong times
          this.wordsTodo[i].checkAnswerTimes += 1;
          this.updateWordResults(this.wordsTodo[i]);
        }
      }
      this.getRandomWord();
    } else {
      console.log('incorrect, try again.');
      for (let i = 0; i < this.wordsTodo.length; i++) {
        if (this.wordsTodo[i] === this.selectedWord) {
          // add to wrong times
          this.wordsTodo[i].gotWrongTimes += 1;
          this.updateWordResults(this.wordsTodo[i]);
        }
      }
      this.test_result_emitter.emit(false);
    }
    this.getRandomWord();
  }

  updateWordResults(word: Word) {
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i] === word) {
        this.words[i].gotRightTimes = word.gotRightTimes;
        this.words[i].gotWrongTimes = word.gotWrongTimes;
        this.words[i].checkAnswerTimes = word.checkAnswerTimes;
      }
    }
  }

  calculateScore() {
    this.totalScore = 0;
    for (let i = 0; i < this.words.length; i++) {
      this.words[i].score = this.words[i].gotRightTimes - this.words[i].gotWrongTimes - (this.words[i].checkAnswerTimes * 0.5);
      this.totalScore += this.words[i].score;
    }
    this.averageScore = this.totalScore / this.words.length;
    console.log('totalScore: ', this.totalScore);
    console.log('averageScore: ', this.averageScore);

    this.duration = this.humanReadableFromMilliseconds(new Date().getTime() - this.startTime.getTime());

    // reorder words by score
    this.words.sort((a, b) => {
      return b.score - a.score;
    });
  }

  humanReadableFromMilliseconds(ms) {
      const days = Math.floor(ms / (24 * 60 * 60 * 1000));
      const daysms = ms % (24 * 60 * 60 * 1000);
      const hours = Math.floor((daysms) / (60 * 60 * 1000));
      const hoursms = ms % (60 * 60 * 1000);
      const minutes = Math.floor((hoursms) / (60 * 1000));
      const minutesms = ms % (60 * 1000);
      const sec = Math.floor((minutesms) / (1000));
      let output = '';
      if (days > 0) {
        output += days + ' d ';
      }
      if (hours > 0) {
        output += hours + ' h ';
      }
      if (minutes > 0) {
        output += minutes + ' min ';
      }
      if (sec > 0) {
        output += sec + ' s';
      }
      return output;
  }

  goToResults() {
    this.testingDone = true;
    this.calculateScore();
  }

}
