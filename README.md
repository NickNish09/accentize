
# Accentize

![badge of version](https://img.shields.io/badge/npm-v1.0.0-green)

  

Transform any string into an accentized regex to match any pattern for filtering, querying, searching, etc...

  

**match a string sample**

![test match](https://i.imgur.com/aVAqz55.gif)

  

**filter array sample**

![filter array](https://i.imgur.com/ibQvtLW.gif)

  

## Installation

```$ yarn add accentize```

  

or with npm

  

```$ npm install --save accentize ```

  

## Why

Usually when we deal with accents the most common approach is to remove the accent from words and then compare/do what you have to do, like:
```
let normalizedString = someFunctionToRemoveAccent("hèllô wórld") // returns hello world
normalizedString === "hello world" // true	
```
What accentize does is kinda the opposite, it transforms a regular string into a regex that will match any versions of that string with accents:

```
// ES6
import accentize from 'accentize';
// commonjs
const accentize = require('accentize');

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

## Common Usage
**Test if a string is a accent version of other:**
```
const accentize = require('accentize');

let accentizedString = accentize("hello world") 
accentizedString.test("hello world") // true
accentizedString.test("hèllô wórld") // true
accentizedString.test("hêlló world") // true
```

**Filter a array where strings can be accent versions:**
```
const accentize = require('accentize');

let  arrayToFilter  = [{name: "João Luís"}, {name: "Mária Ríta"}, {name: "Ísis Môàna"}]
let accentizedString = accentize("joao luis")

let  filteredArray  =  arrayToFilter.filter(user  =>  user.name.match(accentizedString))
// [{"name":"João Luís"}]
```

**With MongoDB queries:**

Suppose you have a Mongo DB with users, represented with the following array:
```
db.getCollection("users") 
// 
[
  {_id: "5ef689", name: "João Luís"},
  {_id: "5efkl9", name: "Mária Ríta"}, 
  {_id: "5ef6a8", name: "Ísis Môàna"}
]
```
You want to make a query to find user with the name Ísis Môàna, by searching for isis moana. Then use:
```
const accentize = require('accentize');

db.users.find({"name": accentize("isis moana")})
// {_id: "5ef6a8", name: "Ísis Môàna"}

db.users.find({"name": accentize("is oana", true)}) // would work with the second param true, the findAll param
```
Notice the second param as true in the second example, it is the findAll param, to include .* in the accentized regex, so the database will find everything that matches, making a query similar to %LIKE%.