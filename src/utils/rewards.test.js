import { calculatePoints } from '../utils/rewards';

describe('calculatePoints', () => {
  test('calculates points for amount over 100 correctly', () => {
    expect(calculatePoints(120)).toBe(90);
  });

  test('calculates points for amount between 50 and 100 correctly', () => {
    expect(calculatePoints(80)).toBe(30);
  });

  test('calculates points for amount under 50 as 0', () => {
    expect(calculatePoints(40)).toBe(0);
  });

  test('calculates points for fractional amount over 100', () => {
    expect(calculatePoints(120.5)).toBe(91);
  });

  test('calculates points for fractional amount between 50 and 100', () => {
    expect(calculatePoints(80.5)).toBe(30);
  });

  test('calculates points for fractional amount under 50 as 0', () => {
    expect(calculatePoints(40.5)).toBe(0);
  });

  test('calculates points for exact 50 as 0', () => {
    expect(calculatePoints(50)).toBe(0);
  });

  test('calculates points for exact 100 as 50', () => {
    expect(calculatePoints(100)).toBe(50);
  });
});