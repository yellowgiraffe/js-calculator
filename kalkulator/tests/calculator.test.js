/* eslint-disable no-undef */

const Calculator = require('../script');

const calculator = new Calculator(a, b, sign);

test('Nazwa', () => {
  expect(calculator('2', '1', '+')).toEqual(3);
});

// test('Default value of calculator schould be zero', () => {
//   const currentValue = document.querySelector('#currentInput');
//   expect(currentValue.text()).toEqual('0');
// });
