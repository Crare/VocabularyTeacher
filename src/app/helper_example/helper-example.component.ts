import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-helper-example',
    templateUrl: './helper-example.component.html'
})
export class HelperExampleComponent {
  @Input() exampleLang1: string;
  @Input() exampleLang2: string;
}
