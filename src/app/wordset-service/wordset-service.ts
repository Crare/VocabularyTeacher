import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordsetService {

  private wordset1 = 'assets/wordsets/words1.json';
  private wordset2 = 'assets/wordsets/words2.json';
  private wordset3 = 'assets/wordsets/words3.json';
  private wordset4 = 'assets/wordsets/words4.json';
  private wordset5 = 'assets/wordsets/words5.json';

  constructor(private http: HttpClient) {}

  getWordset(set: number) {
    switch (set) {
      case 1:
        return this.http.get(this.wordset1);
      case 2:
        return this.http.get(this.wordset2);
      case 3:
        return this.http.get(this.wordset3);
      case 4:
        return this.http.get(this.wordset4);
      case 5:
        return this.http.get(this.wordset5);
      default:
        console.error('unknown wordset number!');
    }
    return this.http.get(this.wordset1);
  }

}
