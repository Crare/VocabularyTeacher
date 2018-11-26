import { Component, Input, OnInit } from '@angular/core';
import { Word } from './Word';
import { WordsetService } from '../wordset-service/wordset-service';



@Component({
  selector: 'app-input-words',
  templateUrl: './input-words.component.html',
  providers: [WordsetService]
})
export class InputWordsComponent implements OnInit {
  @Input() myLanguageWords;
  @Input() learnLanguageWords;
  amountOfTimesWordCorrect = 3;
  amountOfMultiselectChoises = 3;
  words: Array<Word>;
  exampleWords = Array<Word>();
  @Input() testing = false;
  test_results = [];
  maxResultsShown = 10;
  useOnlyGuessWords = false;
  everySecondGuessWord = false;
  useOnlySecondLanguae = false;
  guessWordsOrMultipleChoices = 'both';

  // tslint:disable-next-line:max-line-length
  exampleWordsFin = 'ammattikorkeakoulu\narvosana\nhylätty\nhyväksytty\nkielitaito\nkurssi';
  // tslint:disable-next-line:max-line-length
  exampleWordsSwe = 'yrkeshögskola\nvitsord\nunderkänd\ngodkänd\nspråkkunskaper\nkurs';


  constructor(private wordsetService: WordsetService) {}

  ngOnInit(): void {
    // this.useOnlyGuessWords = true;
    // this.everySecondGuessWord = true;
    // this.debugSkip(1, 3); // TODO: only for debugging, remove after!
    // this._http.get('assets/fin.txt').subscribe(data => {
    //   console.log(data);
    // });
  }

  debugSkip(exampleOption: number, amountOfTimesWordCorrect: number) {
    this.amountOfTimesWordCorrect = amountOfTimesWordCorrect;
    this.useExampleWords(exampleOption);
    this.startTesting();
  }

  addToTestResults(result) {
    console.log('result: ', result);
    if (result) {
      this.test_results.unshift('correct'); // put to front of array
    } else {
      this.test_results.unshift('incorrect'); // put to front of array
    }
    if (this.test_results.length > this.maxResultsShown) {
      this.test_results.pop(); // remove last element
    }
  }

  startTesting() {
    console.log('startTesting');
    console.log('guessWordsOrMultipleChoices: ', this.guessWordsOrMultipleChoices);
    console.log('useOnlySecondLanguae: ', this.useOnlySecondLanguae);
    console.log('useOnlyGuessWords: ', this.useOnlyGuessWords);
    console.log('everySecondGuessWord: ', this.everySecondGuessWord);
    console.log('amountOfTimesWordCorrect: ', this.amountOfTimesWordCorrect);
    console.log('amountOfMultiselectChoises: ', this.amountOfMultiselectChoises);
    this.linkWords((success) => {
      if (success) {
        this.testing = true;
      }
    });
  }

  linkWords(callback) {
    this.words = new Array<Word>();
    if (this.myLanguageWords != null && this.learnLanguageWords != null) {
      const myLangWords = this.myLanguageWords.split('\n');
      const learnLangWords = this.learnLanguageWords.split('\n');

      if (myLangWords.length === learnLangWords.length) {
        for (let i = 0; i < myLangWords.length; i++) {
          const word = new Word(myLangWords[i].replace('\n', ''), learnLangWords[i].replace('\n', ''));
          this.words.push(word);
        }
        console.log(JSON.stringify(this.words));
        callback(true);
      } else {
        alert('There is different number of words! Check there is same amount of words to link them correctly.');
        callback(false);
      }
    } else {
      alert('No words given on both fields! Input words in the textareas on the page. You can copy&paste words there too.');
      callback(false);
    }
  }

  getWordsFromWordsetInLanguage(wordset, language: string) {
    let langString = '';
    for (let i = 0; i < wordset.length; i++) {
      langString += wordset[i][language];
      if (i < wordset.length - 1) {
        langString += '\n';
      }
    }
    // console.log('langString: "' + langString + '"');
    return langString;
  }

  useExampleWords(option: number) {
    this.wordsetService.getWordset(option).subscribe((wordset) => {
      if (wordset) {
        console.log(wordset);
        this.myLanguageWords = this.getWordsFromWordsetInLanguage(wordset, 'lang1');
        this.learnLanguageWords = this.getWordsFromWordsetInLanguage(wordset, 'lang2');
      } else {
        console.error('no wordset found with option: ' + option);
      }
    });
  }

  clearTextareas() {
    this.myLanguageWords = '';
    this.learnLanguageWords = '';
  }
}
