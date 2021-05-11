import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from './interpolation/Sp.js';

test('Cubic Spline', () => {
  render(<App />);
  expect(screen.getByText("Cubic Spline")).toBeInTheDocument();
});
