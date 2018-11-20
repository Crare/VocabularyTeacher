export class Answer {
  word: string;
  guessForeingLanguage: boolean;

  constructor(word: string, guessForeingLanguage: boolean) {
    this.word = word;
    this.guessForeingLanguage = guessForeingLanguage;
  }
}
