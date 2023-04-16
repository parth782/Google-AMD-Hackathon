import React from "react";
import ReactDOM from "react-dom";
import ItemDetails from "./ItemDetails";
import { BrowserRouter } from "react-router-dom";

describe("ItemDetails component", () => {
  it("ItemDetails renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <ItemDetails/>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
