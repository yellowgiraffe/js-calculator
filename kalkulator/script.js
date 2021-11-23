const calculatorElement = document.getElementById('calculator');

class Calculator {
  constructor(previousInput, currentInput, sign) {
    this.previousInput = previousInput;
    this.currentInput = currentInput;
    this.sign = sign;
    this.clear();
  }

  showInput(number) {
    if (this.currentInput.textContent == '0') {
      this.currentInput.textContent = '';
    }

    if (number === '.' && this.currentInput.textContent.includes('.')) {
      number = '';
    }
    
    this.currentInput.textContent = this.currentInput.textContent + number.toString();

  }

  clear() {
    this.previousInput.textContent = '';
    this.currentInput.textContent = '0';
    this.sign.textContent = '';
  }

  chooseOperation(operation) {
    if (this.currentInput.textContent === '0' && operation.textContent === '-') {
      this.currentInput.textContent = '-';
    } else if (this.currentInput.textContent === '0') {
      return;
    }

    if (this.sign.textContent !== '') {
      this.doMath();
    }

    previousInput.textContent = this.currentInput.textContent;
    this.sign.textContent = operation;
    this.currentInput.textContent = '';
  }

  doMath() {
    if (this.currentInput.textContent === '' || this.previousInput.textContent === '') return;
    let result;
    const prev = Number(this.previousInput.textContent);
    const current = Number(this.currentInput.textContent);
    const operator = this.sign.textContent;

    switch(operator) {
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

    this.currentInput.textContent = result;
    this.previousInput.textContent = result;
    this.sigh.textContent = '';
  }
}

const previousInput = document.querySelector('#previousInput');
const currentInput = document.querySelector('#currentInput');
const sign = document.querySelector('#sign');
const clearBtn = document.getElementById('clear');
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');

const calculator = new Calculator(previousInput, currentInput, sign);

numberBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.showInput(button.textContent);
  });
})

operationBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.textContent);
  })
})

clearBtn.addEventListener('click', () => {
  calculator.clear();
});






