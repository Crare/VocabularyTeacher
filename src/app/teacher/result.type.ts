import { Answer } from '../input/tester/Answer';
import { Word } from '../input/Word';

export class Result {
  word: Word;
  answer: Answer;
  correct: number;
  incorrect: number;
  checked: number;

  constructor(word: Word, answer: Answer) {
    this.word = word;
    this.answer = answer;
  }

  incrementCorrect(times = 1) {
    this.correct += times;
  }

  incrementInCorrect(times = 1) {
    this.incorrect += times;
  }



}
