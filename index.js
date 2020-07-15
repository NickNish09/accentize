const cmap = require('./cmap.json');

function substituteCharacterForRegex(chr) {
  if (cmap[chr] !== undefined)
    return cmap[chr];

  return chr;
}
  
function accentizeString(str) {
  let returnString = "";
  for (const c of str) {
    returnString += substituteCharacterForRegex(c);
  }
  
  return returnString;
}

function makeAccentizedRegex(query) {
  let arrayOfQueries = query.toLowerCase().split(" ");
  let queryRegex = ".*";
  arrayOfQueries.map((word) => {
    queryRegex += `${accentizeString(word)}.*`;
  });

  return new RegExp(queryRegex, "i");
}
  
function test(){
  let test_string = "BàTáTa rúsTícâ côm pûré dë mÄndiöcÅ"

  console.log(test_string.match(makeAccentizedRegex("batata rustica com pure de mandioca")))
}
  
test();