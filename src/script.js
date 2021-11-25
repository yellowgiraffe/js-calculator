class Calculator {
  constructor(previousInput, currentInput, signInput) {
    this.previousInput = previousInput;
    this.currentInput = currentInput;
    this.signInput = signInput;
    this.clear();
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

    if (this.signInput.textContent === '') {
      this.currentInput.textContent += number.toString();
    } else {
      this.currentInput.textContent = '';
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
      this.doMath();
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

    this.currentInput.textContent = result;
    this.previousInput.textContent = this.currentInput.textContent;
    this.signInput.textContent = '';
  }
}

const previousInput = document.querySelector('#previousInput');
const currentInput = document.querySelector('#currentInput');
const signInput = document.querySelector('#sign');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');

const calculator = new Calculator(previousInput, currentInput, signInput);

numberBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.showInputNumbers(button.textContent);
  });
});

operationBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.textContent);
  });
});

equalsBtn.addEventListener('click', () => {
  calculator.doMath();
});

clearBtn.addEventListener('click', () => {
  calculator.clear();
});

module.exports = Calculator;