// This is a modified Shuffle function. Originally from http://stackoverflow.com/a/2450976
let shuffle = function (array) {
  // Creating a new array so that the array referenced passed in does not get affected
  let newShuffledArray = [];
  for (let element of array) {
    newShuffledArray.push(element);
  }

  let currentIndex = newShuffledArray.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newShuffledArray[currentIndex];
    newShuffledArray[currentIndex] = newShuffledArray[randomIndex];
    newShuffledArray[randomIndex] = temporaryValue;
  }

  return newShuffledArray;
};

export default shuffle;
