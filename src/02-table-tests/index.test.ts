// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 13, b: 2, action: Action.Subtract, expected: 11 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 13, b: 5, action: Action.Multiply, expected: 65 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: -15, b: 5, action: Action.Divide, expected: -3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 10, b: 3, action: Action.Exponentiate, expected: 1000 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 2, action: undefined, expected: null },
  { a: 10, b: 3, action: '~', expected: null },
  { a: 3, b: 3, action: '--', expected: null },
  { a: '3', b: 2, action: Action.Exponentiate, expected: null },
  { a: null, b: 3, action: Action.Divide, expected: null },
  { a: 3, b: '3', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test('table tests', () => {
    testCases.forEach((item) => {
      const { a, b, action, expected } = item;
      const result = simpleCalculator({
        a: a,
        b: b,
        action: action,
      });
      expect(result).toBe(expected);
    });
  });
  // Consider to use Jest table tests API to test all cases above
});
