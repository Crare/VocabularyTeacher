import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordsetService {

  wordset1fin = 'assets/wordsets/set1/fin.json';
  wordset1swe = 'assets/wordsets/set1/swe.txt';

  constructor(private http: HttpClient) {}

  getWordset(set: number) {
    // let urlfin = '';
    // let urlswe = '';
    // switch (set) {
    //   case 1:
    //   urlfin = this.wordset1fin;
    //   urlswe = this.wordset1swe;
    //   break;
    //   default:
    //     console.error('unknown wordset number!');
    // }
    return this.http.get(this.wordset1fin);
  }

}

export interface Config {
  heroesUrl: string;
  textfile: string;
}
