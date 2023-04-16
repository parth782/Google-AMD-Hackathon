import React from "react";
import ReactDOM from "react-dom";
import Inventory from "./Inventory";
import { BrowserRouter } from "react-router-dom";

describe("Inventory component", () => {
  it("Inventory renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <Inventory/>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
