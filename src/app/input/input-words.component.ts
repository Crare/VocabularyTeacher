import { Component, Input, Output, OnInit } from '@angular/core';
import { Word } from './Word';

@Component({
  selector: 'app-input-words',
  templateUrl: './input-words.component.html'
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
  exampleWordsFin = 'ammattikorkeakoulu\narvosana\nhylätty\nhyväksytty\nkielitaito\nkurssi\nloppukoe\nlukukausi\nlukuvuosi\nmonivalintakoe\nopinnot\nopintopiste\nopiskelijavaihto\nopiskella\nopiskeluaika\noppitunti\npakollinen\nryhmäkeskustelu\nryhmätyö\nsuorittaa\ntyöharjoittelija\ntyöharjoittelu\nvaihto-opiskelija\nvapaavalintainen\nvastaus\nvälikoe';
  // tslint:disable-next-line:max-line-length
  exampleWordsSwe = 'yrkeshögskola\nvitsord\nunderkänd\ngodkänd\nspråkkunskaper\nkurs\nslutprov\ntermin\nläsår\nflervalsprov\nstudier\nstudiepoäng\nstudentutbyte\nstudera\nstudietid\nlektion\nobligatorisk\ngruppdiskussion\ngrupparbete\navlägga\narbetspraktikant\narbetspraktik\nutbytesstudent\nvalfri\nsvar\nmellanprov';
  // tslint:disable-next-line:max-line-length
  exampleWordsFin2 = 'toimiala\nammatillinen\nammattikorkeakoulututkinto\nhaastattelu\nhakemus\nheikkous\nhenkilökohtaiset ominaisuudet\nkesäsijainen\nkesätyö\nkoeaika\nkouluttautua\noppia\nosaaminen\npalkata\nrekrytointi\nsuositukset\ntyöskennellä\ntiedot\ntradenomi\ntyömarkkinat\ntyönantaja\ntyöntekijä\ntyöpaikka\ntyötehtävä\nura\nvahvuus\nvakituinen työsuhde\nvalmiudet\nvastavalmistunut';
  // tslint:disable-next-line:max-line-length
  exampleWordsSwe2 = 'bransch\nyrkesmässig\nyrkeshögskoleexamen\nintervju\nansökan\nsvaghet\npersonliga egenskaper\nsommarvikarie\nsommarjobb\nprovtid\nutbilda sig\nlära sig\nkunnande\nanställa\nrekrytering\nreferenser\narbeta\nkunskaper\ntradenom\narbetsmarknad\narbetsgivare\nmedarbetare\narbetsplats\nbefattning\nkarriär\nstark sida\nfast anställning\nfärdigheter\nnyutexaminerad';


  ngOnInit(): void {
    // this.useOnlyGuessWords = true;
    // this.everySecondGuessWord = true;
    // this.debugSkip(1, 3); // TODO: only for debugging, remove after!
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

  useExampleWords(option: number) {
    switch (option) {
      case 0:
        this.myLanguageWords = this.exampleWordsFin;
        this.learnLanguageWords = this.exampleWordsSwe;
        break;
      case 1:
        this.myLanguageWords = this.exampleWordsFin2;
        this.learnLanguageWords = this.exampleWordsSwe2;
        break;
      case 2:
        this.myLanguageWords = 'testi\ntesti1\ntesti2\ntesti3';
        this.learnLanguageWords = 'test\ntest1\ntest2\ntest3';
        break;
      default:
        console.error('unknown option: ' + option);
    }
  }

  clearTextareas() {
    this.myLanguageWords = '';
    this.learnLanguageWords = '';
  }
}
