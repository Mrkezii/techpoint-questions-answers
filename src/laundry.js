/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */

function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  let uniquePairs = 0;
  const getOccurences = (acc, val) => {
    if (!acc[val]) {
      acc[val] = 1;
      return acc;
    }
    acc[val] += 1;
    return acc;
  };

  // get all the items in clean pile and their occurences
  const cleanPairCount = cleanPile.reduce(getOccurences, {});

  // get the unique pairs in the clean pile
  Object.keys(cleanPairCount).forEach(item => {
    uniquePairs += Math.floor(cleanPairCount[item] / 2);
    cleanPairCount[item] = cleanPairCount[item] % 2;
  })

  if (noOfWashes == 0) { return uniquePairs; };

  // match unpaired items from clean pile in dirty pile
  for (let key in cleanPairCount) {
    if (cleanPairCount[key] === 1) {
      const index = dirtyPile.indexOf(Number(key));
      if (index !== -1) {
        uniquePairs += 1;
        cleanPairCount[key] = 0;
        dirtyPile.splice(index, 1);
        noOfWashes -= 1;
      }
    }
  }

  // get all the items in dirty pile and their occurences
  const dirtyPairCount = dirtyPile.reduce(getOccurences, {});

  let done = false;
  while (noOfWashes >= 2 && !done) {
    // Check if all items in dirty pile have been paired
    const checker = Object.values(dirtyPairCount).every((e) => {
      return e === 0 || e === 1;
    })
    if (checker) {
      done = true;
      break;
    }

    // Look for pairs in dirty pile if no of washes >= 2
    Object.keys(dirtyPairCount).forEach((e) => {
      while (dirtyPairCount[e] >= 2 && noOfWashes >= 2) {
        dirtyPairCount[e] -= 2;
        uniquePairs += 1;
        noOfWashes -= 2;
      }
    })
  }

  return (uniquePairs);
}

module.exports = getMaxPairs;
