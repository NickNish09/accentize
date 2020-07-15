
# Accentize

![badge of version](https://img.shields.io/badge/npm-v1.0.0-green)

  

Transform any string in an accentized regex to match any pattern for filtering, querying, searching, etc...

  

**match a string sample**

![test match](https://i.imgur.com/d8NYZpZ.gif)

  

**filter array sample**

![filter array](https://i.imgur.com/ibQvtLW.gif)

  

## Installation

```$ yarn add accentize```

  

or with npm

  

```$ npm install --save accentize ```

  

## Usage

Usually when we deal with accents the most common approach is to remove the accent from words and then compare/do what you have to do, like:
```
let normalizedString = someFunctionToRemoveAccent("hèllô wórld") // returns hello world
normalizedString === "hello world" // true	
```
What accentize does is kinda the opposite, it transforms a regular string into a regex that will match any versions of that string with accents:
```
let accentizedString = accentize("hello world") 
// returns the regex: /\s*[hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ][eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ][lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ][lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ][oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ]\s*\s*[wⓦｗẁẃŵẇẅẘẉⱳ][oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ][rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ][lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ][dⓓｄḋďḍḑḓḏđƌɖɗꝺ]\s*/i

accentizedString.test("hello world") // true
accentizedString.test("hèllô wórld") // true
accentizedString.test("hêlló world") // true
```
With the accentized regex **you can test any variant of a string with accent using the normalized string!**

Works with **case insensitivity** too:
```
let stringToFind = "hÉllò Wôrld"
let accentizedString = accentize("hello world")
accentizedString.test(stringToFind) // true
```