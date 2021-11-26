/* eslint-disable no-undef */
// const fs = require('fs');
// const Calculator = require('../Calculator');
import Calculator from '../src/Calculator';
// const data = fs.readFileSync(`${__dirname}/../index.html`, 'utf8');

// document.body.innerHTML = data;

describe('Calculator: doMath', () => {
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

  test('multiply 11 by 4', () => {
    document.body.innerHTML = '<div id="previousInput">11</div>'
    + '<div id="currentInput">4</div>'
    + '<div id="sign">×</div>';
    previousInput = document.querySelector('#previousInput');
    currentInput = document.querySelector('#currentInput');
    signInput = document.querySelector('#sign');
    calc = new Calculator(previousInput, currentInput, signInput);
    expect(calc.doMath()).toBe(44);
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
