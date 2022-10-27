var vowel = ['а', 'о', 'ы', 'у', 'э', 'я', 'ё', 'и', 'ю', 'е'];
var message = prompt('Введите строку на русском языке');
var countVowel;

findVowel();
console.log(countVowel);

function findVowel() {
  countVowel = 0;
  for (var i = 0; i < message.length; i++) {
    if (vowel.indexOf(message[i]) >= 0) {
      countVowel++;
    }
  }
  return countVowel;
}