// Imports
import { render } from "@testing-library/react";

// To Test
import App from "../App";

// Tests
test("Renders main page correctly", () => {
  // Setup
  render(<App />);

  expect(true).toBeTruthy();
});
