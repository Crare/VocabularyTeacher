import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordsetService {

  constructor(private http: HttpClient) {}

  getWordset(set: number) {
    return this.http.get('assets/wordsets/words' + set + '.json');
  }

}
