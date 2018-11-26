// example run code:
// node parser.js --path1 ./wordsets/set5/fin.txt --path2 ./wordsets/set5/swe.txt --outputpath ../src/assets/wordsets/words5.json

const fs = require('fs');

var yargs = require('yargs').options({
    'path1' : {
        'default' : './wordsets/set1/fin.txt',
        'description' : 'Path for language1 textfile.'
    },
    'path2' : {
        'default' : './wordsets/set1/swe.txt',
        'description' : 'Path for language2 textfile.'
    },
    'outputpath' : {
        'default' : '../src/assets/wordsets/words1.json',
        'description' : 'Output path for json.'
    },
    'help' : {
        'alias' : 'h',
        'type' : 'boolean',
        'description' : 'Show this help.'
    }
});
var argv = yargs.argv;

class Word {
    constructor(lang1, lang2) {
        this.lang1 = lang1;
        this.lang2 = lang2;
    }
}

convertTextFilesToJSON = (lang1, lang2) => {
    let lang1t = fs.readFileSync(lang1, 'utf8').split('\n');
    let lang2t = fs.readFileSync(lang2, 'utf8').split('\n');

    let words = [];

    if(lang1t.length === lang1t.length) {
        for (let i = 0; i < lang1t.length; i++) {
          if (lang1t[i] != '' && lang2t[i] != '') {
            let word = new Word(lang1t[i], lang2t[i]);
            words.push(word);
          }
        }
        console.log(words);
        fs.writeFile(argv.outputpath, JSON.stringify(words), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    } else {
        console.error('given language files are not same length!');
    }

}

if (argv.path1 && argv.path2) {
    convertTextFilesToJSON(argv.path1, argv.path2);
} else {
    console.log('give path to language1 and language2 text files.');
}
