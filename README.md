# VocabularyTeacher

Learn any language vocabulary, if you have the words, just add them here and this app tests them from you.

**Input your own words or use existing sets. Any language possible, if you have the words for both languages.**

<img src="https://github.com/Crare/VocabularyTeacher/blob/master/src/assets/img/input_words.png" width="1000">

**Writing test, randomly switching between both languages.**

<img src="https://github.com/Crare/VocabularyTeacher/blob/master/src/assets/img/write_words.png" width="400">

**Multiselection test, randomly switching between both languages.**

<img src="https://github.com/Crare/VocabularyTeacher/blob/master/src/assets/img/select_word.png" width="600">

**Check results after test, see what words you have to improve more.**

<img src="https://github.com/Crare/VocabularyTeacher/blob/master/src/assets/img/show_results.png" width="600">


## setup

You need to install [npm](https://www.npmjs.com/get-npm) and [nodejs](https://nodejs.org/).

Install required modules from terminal/commandline in project root directory with command `npm install`. Run the project with `npm start`. App should be running at http://localhost:4200/



## Includes WordJsonParser

WordJsonParser is simple Node.js script that combines two textfiles to one json. It is used to create ready-made wordsets for use. It is located at /wordJsonParser/

run `npm install` to install required packages. run with `node parser.js` Extra parameters found with `--help`.

### parser parameters:

`--help` show options for parameters.

`--path1 <pathToFile1>` Path for language1 textfile. [default: "./wordsets/set1/fin.txt"]

`--path2 <pathToFile2>` Path for language1 textfile. [default: "./wordsets/set1/swe.txt"]

`--outputpath <pathForOutputFile>` Output path for json. [default: "../src/assets/wordsets/words1.json"]





------------- angular-cli generated content below: -------------

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
