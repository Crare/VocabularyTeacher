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

// export class Word {
//   lang1: string;
//   lang2: string;
//   correct = 0;
//   incorrect = 0;
//   checked = 0;
//   score: number;

//   constructor(lang1: string, lang2: string) {
//       this.lang1 = lang1;
//       this.lang2 = lang2;
//   }
// }
