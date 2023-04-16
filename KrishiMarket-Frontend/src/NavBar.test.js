import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

describe("ListOfDiets component", () => {
  it("ListOfDiets renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});