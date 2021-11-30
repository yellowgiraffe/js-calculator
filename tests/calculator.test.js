/* eslint-disable no-undef */
import fs from 'fs';
import { dirname } from 'path';
import { jest } from '@jest/globals';
import { fileURLToPath } from 'url';

import Calculator from '../src/Calculator';

const __dirname = dirname(fileURLToPath(import.meta.url));

const simulateClick = (el) => {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

let calc = null;
let html = null;

beforeAll(() => {
  html = fs.readFileSync(__dirname + '/../src/index.html', 'utf8');
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

describe('Call function after button is clicked', () => {
  let buttonSpyFn;

  beforeEach(() => {
    calc.init();
  });

  test('should call showInputNumbers after number button is clicked', () => {
    buttonSpyFn = jest.spyOn(calc, 'showInputNumbers');
    const numberBtn = document.querySelector('[data-button="number"]');

    simulateClick(numberBtn);

    expect(buttonSpyFn).toHaveBeenCalled();
    expect(buttonSpyFn).toHaveBeenCalledWith(numberBtn.textContent);
  });

  test('should call chooseOperator after operation button is clicked', () => {
    buttonSpyFn = jest.spyOn(calc, 'chooseOperator');
    const operatorBtn = document.querySelector('[data-button="operator"]');
    
    simulateClick(operatorBtn);
    
    expect(buttonSpyFn).toHaveBeenCalled();
    expect(buttonSpyFn).toHaveBeenCalledWith(operatorBtn.textContent);
  });

  test('should call equals function after equals button is clicked', () => {
    buttonSpyFn = jest.spyOn(calc, 'equals');
    const equalsBtn = document.querySelector('[data-button="equals"]');

    simulateClick(equalsBtn);

    expect(buttonSpyFn).toHaveBeenCalled();
  });

  test('should call reset function after clear button is clicked', () => {
    buttonSpyFn = jest.spyOn(calc, 'reset');
    const clearBtn = document.querySelector('[data-button="clear"]');
    
    simulateClick(clearBtn);
    
    expect(buttonSpyFn).toHaveBeenCalled();
  });

  // test('displays number after click', async () => {
  //   const btnOne = document.querySelector('#one');
  //   const currentInput = document.querySelector('#currentInput');
  //   await btnOne.click();
  //   expect(currentInput.textContent).toEqual('1');
  // });

  // test('should call equals function', () => {
  //   previousInput = 5;
  //   currentInput = 7;
  //   const equals = document.querySelector('#equals');
  //   equals.click();
  //   expect(equalsFn).toHaveBeenCalled();
  // });
});


describe('Calculate mathematics operations', () => {
  document.body.innerHTML = `<div id="previousInput">21</div>'
  + '<div id="currentInput">3</div>'
  + '<div id="sign">+</div>`;
  let previousInput;
  let currentInput;
  let signInput;
  let calc;

  test('schould be defined', () => {
    document.body.innerHTML = '<div id="previousInput">21</div>'
    + '<div id="currentInput">3</div>'
    + '<div id="sign">+</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);

    expect(calc.doMath).toBeDefined();
    expect(calc.doMath).not.toBeUndefined();
  });

  test('add 21 to 3', () => {
    document.body.innerHTML = '<div id="previousInput">21</div>'
    + '<div id="currentInput">3</div>'
    + '<div id="sign">+</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);

    expect(calc.doMath()).toBe(24);
  });

  test('add 17.2 to 3.5', () => {
    document.body.innerHTML = '<div id="previousInput">17.2</div>'
    + '<div id="currentInput">3.5</div>'
    + '<div id="sign">+</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);

    expect(calc.doMath()).toBe(20.7);
  });

  test('add -14 to 9', () => {
    document.body.innerHTML = '<div id="previousInput">-14</div>'
    + '<div id="currentInput">9</div>'
    + '<div id="sign">+</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);

    expect(calc.doMath()).toBe(-5);
  });

  test('subtract 12 from 7', () => {
    document.body.innerHTML = '<div id="previousInput">12</div>'
    + '<div id="currentInput">7</div>'
    + '<div id="sign">-</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);
    expect(calc.doMath()).toBe(5);
  });

  test('subtract 55.5 from 50.1', () => {
    document.body.innerHTML = '<div id="previousInput">55.5</div>'
    + '<div id="currentInput">50.1</div>'
    + '<div id="sign">-</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);
    expect(calc.doMath()).toBe(5.4);
  });

  test('multiply 4 by 11', () => {
    document.body.innerHTML = '<div id="previousInput">4</div>'
    + '<div id="currentInput">11</div>'
    + '<div id="sign">×</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);
    expect(calc.doMath()).toBe(44);
  });

  test('multiply 16.2 by 0.5', () => {
    document.body.innerHTML = '<div id="previousInput">16.2</div>'
    + '<div id="currentInput">0.5</div>'
    + '<div id="sign">×</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);
    expect(calc.doMath()).toBe(8.1);
  });

  test('divide 60 by 10', () => {
    document.body.innerHTML = '<div id="previousInput">60</div>'
    + '<div id="currentInput">10</div>'
    + '<div id="sign">÷</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);
    expect(calc.doMath()).toBe(6);
  });

  test('divide 14 by 3', () => {
    document.body.innerHTML = '<div id="previousInput">14</div>'
    + '<div id="currentInput">3</div>'
    + '<div id="sign">÷</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);
    expect(calc.doMath()).toBe(4.66666667);
  });
});

// test('Default value of calculator schould be zero', () => {
//   const currentValue = document.querySelector('#currentInput');
//   expect(currentValue.text()).toEqual('0');
// });

// const { assert } = require('console');
// const fs = require('fs')
// const $ = require('jquery');

// 'use strict';

// test('verify if test is visible and the color is correct', () => {
//     // given (settery, ustawimy test)
//     const data = fs.readFileSync(__dirname + '/../index.html', 'utf8')
//     document.body.innerHTML = data;

//     // when
//     const e = $('#main');

//     // then
//     expect(e.text()).toEqual('Witajcie Kochani');
//     expect(e.css('color')).toEqual('brown');
// });
