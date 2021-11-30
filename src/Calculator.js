/* eslint-disable consistent-return */

// TO DO
// Wyświetl komunikat "Nie można dzileić przez zero"
// Dodaj możliwość wpisywania ujemnej liczby jako drugi operand
// Zablokój klikanie przycisków + - * /, kiedy jeden był właśnie kliknięty
export default class Calculator {
  constructor() {
    this.currentInput = document.querySelector('#currentInput');
    this.previousInput = document.querySelector('#previousInput');
    this.signInput = document.querySelector('#sign');
    this.keys = document.querySelector('#buttons');
  }

  init() {
    this.reset();
    this.listenToButtons();
  }

  listenToButtons() {
    this.keys.addEventListener('click', event => {
      const { target } = event;

      if (!target.matches('button')) {
        return;
      }

      const buttonType = target.getAttribute('data-button');

      switch(buttonType) {
        case 'number':
          this.showInputNumbers(target.textContent);
          break;
        case 'operator':
          this.chooseOperator(target.textContent);
          break;
        case 'equals':
          this.equals();
          break;
        case 'clear':
          this.reset()
          break;
      }
    });
  }

  showInputNumbers(number) {
    if (this.currentInput.textContent === '0') {
      this.currentInput.textContent = '';
    }

    if (number === '.' && this.currentInput.textContent.includes('.')) {
      return;
    }

    if (number === '.' && this.currentInput.textContent === '') {
      this.currentInput.textContent = '0.';
      return;
    }

    if (number === '.' && this.currentInput.textContent === '-') {
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

  reset() {
    this.currentInput.textContent = '0';
    this.previousInput.textContent = '';
    this.signInput.textContent = '';
  }

  chooseOperator(operation) {
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

    if (result.toString().length > 10) {
      return Number(result.toFixed(8));
    }

    return result;
  }

  showResult() {
    const result = this.doMath();
    this.previousInput.textContent = this.currentInput.textContent;
    this.currentInput.textContent = result || '0';
    this.signInput.textContent = '';
  }

  equals() {
    const result = this.doMath();
    console.log(result);
    this.previousInput.textContent += ` ${this.signInput.textContent} ${this.currentInput.textContent} =` ; // 9 + 1 =
    this.currentInput.textContent = result || '0';
    this.signInput.textContent = '';
  }
}
