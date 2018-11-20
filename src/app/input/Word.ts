export class Word {
  firstlanguageWord: string;
  secondLanguageWord: string;
  gotRightTimes = 0;
  gotWrongTimes = 0;
  checkAnswerTimes = 0;
  score: number;

  constructor(firstlanguageWord: string, secondLanguageWord: string) {
      this.firstlanguageWord = firstlanguageWord;
      this.secondLanguageWord = secondLanguageWord;
  }
}
