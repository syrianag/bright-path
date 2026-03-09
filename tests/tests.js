function sum(a, b) {
  return a + b;
}

test("adds two numbers", () => {
  expect(sum(2, 2)).toBe(4); // I am going to intentionally change this line for CI Pipeline testing 
});