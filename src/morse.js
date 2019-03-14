const MORSE_CODE = {
  '-.-.--': '!',
  '.-..-.': '"',
  '...-..-': '$',
  '.-...': '&',
  '.----.': "'",
  '-.--.': '(',
  '-.--.-': ')',
  '.-.-.': '+',
  '--..--': ',',
  '-....-': '-',
  '.-.-.-': '.',
  '-..-.': '/',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '..--..': '?',
  '.--.-.': '@',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '..--.-': '_',
  '...---...': 'SOS',
};

Object.freeze(MORSE_CODE);

function decodeMorse(morseCode) {

  if (morseCode === "") { return "" }
  const trimmedMorse = morseCode.trim();
  let splittedMorse = trimmedMorse.split(' ');
  return splittedMorse.length > 1 ? decodeSplitted() : decodeSingle();

  function decodeSplitted() {
    let arrayMorse = splittedMorse.map((value) => {
      if (value == ' ') return ' ';
      return MORSE_CODE[value];
    });

    let thereIsASpace = false;

    arrayMorse.forEach((item, index, array) => {
      if (index > 0 && !array[index] && !array[index + 1]) {
        thereIsASpace = true;
      }
      if (index === arrayMorse.length - 1 && !thereIsASpace) {
        arrayMorse = arrayMorse.join('');
      }
    })

    if (thereIsASpace) {
      arrayMorse.map((item, index, array) => {
        if (!item) array[index] = 'a';
      })
      arrayMorse = arrayMorse.join('')
      arrayMorse = arrayMorse.replace(/[a][a]/g, ' ');
      return arrayMorse;
    }
    else {
      return arrayMorse;
    }
  }
  function decodeSingle() {
    return MORSE_CODE[splittedMorse];
  }
}


module.exports = decodeMorse;
