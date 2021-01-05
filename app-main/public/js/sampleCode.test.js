const sampleCode = require("./sampleCode");

test("This verifies that sampleCode sends a bool response", () => {
  expect(sampleCode()).toEqual(false);
});
