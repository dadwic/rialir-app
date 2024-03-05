const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export function persianNumber(value: string) {
  for (let i = 0, numbersLen = persianNumbers.length; i < numbersLen; i++) {
    value = value.replace(
      new RegExp(englishNumbers[i], 'g'),
      persianNumbers[i],
    );
  }

  return value;
}

export function tryFormat(num: string) {
  return persianNumber(
    parseFloat(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+$)/g, '$&,'),
  );
}

export function ccyFormat(num: string) {
  return parseInt(num)
    .toFixed(0)
    .replace(/\d(?=(\d{3})+$)/g, '$&,');
}

export function numFormat(value: string) {
  return persianNumber(ccyFormat(value));
}
