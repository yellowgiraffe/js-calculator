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
    this.keys.addEventListener('click', (event) => {
      const { target } = event;

      if (!target.matches('button')) {
        return;
      }

      const buttonType = target.getAttribute('data-button');

      switch (buttonType) {
        case 'number':
          this.chooseNumber(target.textContent);
          break;
        case 'operator':
          this.chooseOperator(target.textContent);
          break;
        case 'equals':
          this.showResult();
          this.previousNumber = '';
          break;
        case 'clear':
          this.reset();
          break;
        default:
          return;
      }

      this.updateDisplay();
    });
  }

  updateDisplay() {
    this.currentInput.textContent = this.currentNumber;
    this.previousInput.textContent = this.previousNumber;
    this.signInput.textContent = this.operator;
  }

  chooseNumber(number) {
    if (this.currentNumber === '0') {
      this.currentNumber = '';
    }

    if (number === '.' && this.currentNumber.includes('.')) {
      return;
    }

    if (number === '.' && this.currentNumber === '') {
      this.currentNumber = '0.';
      return;
    }

    if (this.currentNumber === this.previousNumber && this.operator !== '') {
      this.currentNumber = '';
      this.currentNumber += number.toString();
    } else {
      this.currentNumber += number.toString();
    }
  }

  reset() {
    this.currentNumber = '0';
    this.previousNumber = '';
    this.operator = '';
  }

  chooseOperator(operation) {
    if (this.operator !== '') {
      this.showResult();
    }

    this.previousNumber = this.currentNumber;
    this.operator = operation;
    this.isWaitingForSecondOperand = true;
  }

  doMath() {
    let result;
    const prev = Number(this.previousNumber);
    const curr = Number(this.currentNumber);
    const sign = this.operator;

    switch (sign) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '×':
        result = prev * curr;
        break;
      case '÷':
        result = prev / curr;
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
    this.currentNumber = result || '0';
    this.previousNumber = this.currentNumber;
    this.operator = '';
  }
}
