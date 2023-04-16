import React from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer component", () => {
  it("Footer renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});