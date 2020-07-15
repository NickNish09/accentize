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

function makeAccentizedRegex(query, findAll) {
  let arrayOfQueries = query.trim().toLowerCase().split(" ");
  let modifier = "\\s*"
  if(findAll)
    modifier = ".*" // make a pattern to match everything
  let queryRegex = modifier;
  arrayOfQueries.map((word) => {
    queryRegex += `${modifier}${accentizeString(word)}${modifier}`;
  });

  return new RegExp(queryRegex, "i");
}
  
function test(){
  let testString = "BàTáTa rúsTícâ côm pûré dë mÄndiöcÅ"
  let accentizedString = (makeAccentizedRegex("hello world"));

  console.log(accentizedString)
  console.log(accentizedString.test("hEllo world"))
  console.log(accentizedString.test("helló wòrld"))
  console.log(accentizedString.test("hêllo wórld"))
  console.log(testString.match(makeAccentizedRegex("batata rustica ")))
  console.log(testString.match(makeAccentizedRegex("batata rustica ", true)))
}
  
test();

module.exports = makeAccentizedRegex;