import { sum } from "../src/sample/sum";

test('soma de 2 + 3 deve ser 5', () => {
  expect(sum(2, 3)).toBe(5);
});
