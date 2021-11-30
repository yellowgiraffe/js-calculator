/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import fs from 'fs';
import { dirname } from 'path';
import { jest } from '@jest/globals';
import { fileURLToPath } from 'url';

import Calculator from '../src/Calculator';

const __dirname = dirname(fileURLToPath(import.meta.url));

const simulateClick = (el) => {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
};

let calc = null;
let html = null;

beforeAll(() => {
  html = fs.readFileSync(`${__dirname}/../src/index.html`, 'utf8');
});

beforeEach(() => {
  document.documentElement.innerHTML = html;
  calc = new Calculator();
});

describe('Class Calculator', () => {
  test('should exist and to be type of function', () => {
    expect(Calculator).toBeDefined();
    expect(typeof Calculator).toBe('function');
  });

  test('constructor should get DOM elements for display', () => {
    expect(calc.currentInput).toMatchSnapshot();
    expect(calc.previousInput).toMatchSnapshot();
    expect(calc.signInput).toMatchSnapshot();
    expect(calc.keys).toMatchSnapshot();
  });
});

describe('Init method', () => {
  test('shout call reset method', () => {
    const resetSpy = jest.spyOn(calc, 'reset');
    calc.init();
    expect(resetSpy).toHaveBeenCalled();
  });

  test('should call listenToButtons method', () => {
    const resetSpy = jest.spyOn(calc, 'listenToButtons');
    calc.init();
    expect(resetSpy).toHaveBeenCalled();
  });
});

describe('Reset method', () => {
  beforeEach(() => {
    calc.init();
  });

  test('should change values to default', () => {
    calc.reset();
    expect(calc.currentNumber).toBe('0');
    expect(calc.previousNumber).toBe('');
    expect(calc.operator).toBe('');
  });
});

describe('Call function after button is clicked', () => {
  let buttonSpyFn;
  let updateDisplayFn;

  beforeEach(() => {
    calc.init();
    updateDisplayFn = jest.spyOn(calc, 'updateDisplay');
  });

  test('should call chooseNumber after number button is clicked', () => {
    buttonSpyFn = jest.spyOn(calc, 'chooseNumber');
    const numberBtn = document.querySelector('[data-button="number"]');

    simulateClick(numberBtn);

    expect(buttonSpyFn).toHaveBeenCalled();
    expect(buttonSpyFn).toHaveBeenCalledWith(numberBtn.textContent);
    expect(updateDisplayFn).toHaveBeenCalled();
  });

  test('should call chooseOperator after operation button is clicked', () => {
    buttonSpyFn = jest.spyOn(calc, 'chooseOperator');
    const operatorBtn = document.querySelector('[data-button="operator"]');

    simulateClick(operatorBtn);

    expect(buttonSpyFn).toHaveBeenCalled();
    expect(buttonSpyFn).toHaveBeenCalledWith(operatorBtn.textContent);
    expect(updateDisplayFn).toHaveBeenCalled();
  });

  test('should call showResult function after equals button is clicked', () => {
    buttonSpyFn = jest.spyOn(calc, 'showResult');
    const equalsBtn = document.querySelector('[data-button="equals"]');

    simulateClick(equalsBtn);

    expect(buttonSpyFn).toHaveBeenCalled();
    expect(updateDisplayFn).toHaveBeenCalled();
  });

  test('should call showResult function if operation button is clicked ????????????', () => {
    buttonSpyFn = jest.spyOn(calc, 'showResult');
    const equalsBtn = document.querySelector('[data-button="equals"]');

    simulateClick(equalsBtn);

    expect(buttonSpyFn).toHaveBeenCalled();
    expect(updateDisplayFn).toHaveBeenCalled();
  });

  test('should call reset function after clear button is clicked', () => {
    buttonSpyFn = jest.spyOn(calc, 'reset');
    const clearBtn = document.querySelector('[data-button="clear"]');

    simulateClick(clearBtn);

    expect(buttonSpyFn).toHaveBeenCalled();
    expect(updateDisplayFn).toHaveBeenCalled();
  });
});

describe('Calculate mathematics operations', () => {
  beforeEach(() => {
    calc.init();
  });

  test('schould be defined', () => {
    expect(calc.doMath).toBeDefined();
  });

  test('should add numbers if operator is +', () => {
    calc.previousNumber = '21';
    calc.currentNumber = '3';
    calc.operator = '+';
    expect(calc.doMath()).toBe(24);
  });

  test('should subtract numbers if operator is -', () => {
    calc.previousNumber = '12';
    calc.currentNumber = '7';
    calc.operator = '-';
    expect(calc.doMath()).toBe(5);
  });

  test('should multiply numbers if operator is ×', () => {
    calc.previousNumber = '4';
    calc.currentNumber = '11';
    calc.operator = '×';
    expect(calc.doMath()).toBe(44);
  });

  test('should divide numbers if operator is ÷', () => {
    calc.previousNumber = '60';
    calc.currentNumber = '10';
    calc.operator = '÷';
    expect(calc.doMath()).toBe(6);
  });

  test('should return undefined if operand is not a number type', () => {
    calc.previousNumber = 'Hello';
    calc.currentNumber = '3';
    calc.operator = '÷';
    expect(calc.doMath()).toBeUndefined();
  });

  test('should return undefined if operator is not a math sign', () => {
    calc.previousNumber = 'Hello';
    calc.currentNumber = '3';
    calc.operator = '';
    expect(calc.doMath()).toBeUndefined();
  });

  test('should return result with max 8 decimal places', () => {
    calc.previousNumber = '14';
    calc.currentNumber = '3';
    calc.operator = '÷';
    expect(calc.doMath()).toBe(4.66666667);
  });
});

describe('Show clicked button on display', () => {
  beforeEach(() => {
    calc.init();
  });

  test('should change default current value to value of clicked button', () => {
    const currentInput = document.querySelector('#currentInput');
    const numberBtn = document.querySelector('[data-button="number"]');

    simulateClick(numberBtn);

    expect(currentInput.textContent).toBe(`${numberBtn.textContent}`);
  });

  test('should add new number on display when current value is not default value', () => {
    calc.currentNumber = '9';
    const currentInput = document.querySelector('#currentInput');
    const numberBtn = document.querySelector('[data-button="number"]');

    simulateClick(numberBtn);

    expect(currentInput.textContent).toBe(`9${numberBtn.textContent}`);
  });

  test('should change operator sign on display', () => {
    const signInput = document.querySelector('#sign');
    const operatorBtn = document.querySelector('[data-button="operator"]');

    simulateClick(operatorBtn);

    expect(signInput.textContent).toBe(`${operatorBtn.textContent}`);
  });

  test('should calculate and display results after equals button is clicked', () => {
    const currentInput = document.querySelector('#currentInput');
    const previousInput = document.querySelector('#previousInput');
    const signInput = document.querySelector('#sign');
    const operatorBtn = document.querySelector('#minus');
    const equalsBtn = document.querySelector('#equals');
    const numberSix = document.querySelector('#six');
    const numberTwo = document.querySelector('#two');

    simulateClick(numberSix);
    simulateClick(operatorBtn);
    simulateClick(numberTwo);
    simulateClick(equalsBtn);

    expect(currentInput.textContent).toBe('4');
    expect(previousInput.textContent).toBe('');
    expect(signInput.textContent).toBe('');
  });

  test('should calculate and display result if more then one operator was used in calculation', () => {
    const currentInput = document.querySelector('#currentInput');
    const previousInput = document.querySelector('#previousInput');
    const signInput = document.querySelector('#sign');
    const operatorBtn = document.querySelector('#minus');
    const numberBtns = document.querySelectorAll('[data-button="number"]');

    simulateClick(numberBtns[5]);
    simulateClick(operatorBtn);
    simulateClick(numberBtns[3]);
    simulateClick(operatorBtn);

    expect(currentInput.textContent).toBe('2');
    expect(previousInput.textContent).toBe(currentInput.textContent);
    expect(signInput.textContent).toBe(operatorBtn.textContent);
  });

  test('should reset all values on display', () => {
    const currentInput = document.querySelector('#currentInput');
    const previousInput = document.querySelector('#previousInput');
    const signInput = document.querySelector('#sign');
    const operatorBtn = document.querySelector('#divide');
    const numberSix = document.querySelector('#six');
    const numberTwo = document.querySelector('#two');
    const clearBtn = document.querySelector('#clear');

    simulateClick(numberSix);
    simulateClick(operatorBtn);
    simulateClick(numberTwo);
    simulateClick(clearBtn);

    expect(currentInput.textContent).toBe('0');
    expect(previousInput.textContent).toBe('');
    expect(signInput.textContent).toBe('');
  });

  test('should display "0." when dot botton is clicked as the first one', () => {
    calc.currentNumber = '0';
    const currentInput = document.querySelector('#currentInput');
    const dotBtn = document.querySelector('#dot');

    simulateClick(dotBtn);

    expect(currentInput.textContent).toBe(`0${dotBtn.textContent}`);
  });

  test('should not allow to input two dots', () => {
    calc.currentNumber = '25.5';
    const dotBtn = document.querySelector('#dot');

    simulateClick(dotBtn);

    expect(currentInput.textContent).toBe(`${calc.currentNumber}`);
  });

  test('', () => {});

  test('', () => {});
});
