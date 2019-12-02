import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

describe("Application", () => {
it("defaults to Monday and changes the schedule when a new day is selected", () => {
  render(<Appointment />);
});
});