import { Component } from '@angular/core';
import { TeacherService } from './service/teacher-service';
import { Result } from './result.type';
import { Word } from '../input/Word';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  providers: [TeacherService]
})
export class TeacherComponent {
  results: Result[];
  words: Word[];

}
