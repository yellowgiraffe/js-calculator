/* eslint-disable consistent-return */
export default class Calculator {
  constructor(previousInput, currentInput, signInput) {
    this.previousInput = previousInput;
    this.currentInput = currentInput;
    this.signInput = signInput;
  }

  showInputNumbers(number) {
    if (this.currentInput.textContent === '0') {
      this.currentInput.textContent = '';
    }

    if (number === '.' && this.currentInput.textContent.includes('.')) {
      return;
    }

    if (number === '.' && this.currentInput.textContent === ''
    || number === '.' && this.currentInput.textContent === '-') {
      this.currentInput.textContent = '-0.';
      return;
    }

    // this.currentInput.textContent += number.toString();

    // To dziala dla jednej liczby
    // if (this.signInput.textContent === '') {
    //   this.currentInput.textContent += number.toString();
    // } 
    // else {
    //   this.currentInput.textContent = '';
    //   this.currentInput.textContent += number.toString();
    // }

    // Dziala dla dwóch cyfr, ale nie dziala 2 + 22
    if (this.currentInput.textContent === this.previousInput.textContent 
      && this.signInput.textContent !== '') {
        this.currentInput.textContent = '';
        this.currentInput.textContent += number.toString();
      } else {
        this.currentInput.textContent += number.toString();
      }
  }

  clear() {
    this.previousInput.textContent = '';
    this.currentInput.textContent = '0';
    this.signInput.textContent = '';
  }

  chooseOperation(operation) {
    if (this.currentInput.textContent === '0' && operation === '-') {
      this.currentInput.textContent = '-';
      return;
    }

    if (this.signInput.textContent !== '') {
      this.showResult();
    }

    this.previousInput.textContent = this.currentInput.textContent;
    this.signInput.textContent = operation;
  }

  doMath() {
    let result;
    const prev = Number(this.previousInput.textContent);
    const current = Number(this.currentInput.textContent);
    const operator = this.signInput.textContent;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }

    if (Number.isNaN(result)) {
      return;
    }

    // if (result.toString().length > 10) {
    //   result.toFixed()
    // }

    return result;
  }

  showResult() {
    const result = this.doMath();
    this.previousInput.textContent = this.currentInput.textContent;
    this.currentInput.textContent = result || '0';
    this.signInput.textContent = '';
  }

  equials() {
    const result = this.doMath();
    this.previousInput.textContent += ` ${this.signInput.textContent} ${this.currentInput.textContent} =` ;
    this.currentInput.textContent = result || '0';
    this.signInput.textContent = '';
  }
}
