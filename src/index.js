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

function accentize(query, findAll) {
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

module.exports = accentize;