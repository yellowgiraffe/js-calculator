import Calculator from './Calculator.js';

window.addEventListener('DOMContentLoaded', () => {
  const previousInput = document.querySelector('#previousInput');
  const currentInput = document.querySelector('#currentInput');
  const signInput = document.querySelector('#sign');

  const calculator = new Calculator(previousInput, currentInput, signInput);

  const numberBtns = document.querySelectorAll('[data-number]');
  numberBtns.forEach((button) => {
    button.addEventListener('click', () => {
      calculator.showInputNumbers(button.textContent);
    });
  });

  const operationBtns = document.querySelectorAll('[data-operation]');
  operationBtns.forEach((button) => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.textContent);
    });
  });

  const equalsBtn = document.getElementById('equals');
  equalsBtn.addEventListener('click', () => {
    calculator.equials();
  });

  const clearBtn = document.getElementById('clear');
  clearBtn.addEventListener('click', () => {
    calculator.clear();
  });
});
