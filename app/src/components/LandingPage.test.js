import React from "react";
//render takes a component re-creates it in the dom without using the browser
//screen allows us to search for the virtual dom in order to find elements on the screen

import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";

//i like to use describe to keep track of what all the tests pertain to
describe("LandingPage", () => {
  test("this component renders without error", () => {
    render(<LandingPage />);
  });
  test("renders error message when input field are empty", () => {
    render(<LandingPage />);
    expect(screen.getByText(/input field value is required/i)).not.toBeNull();
  });
});
