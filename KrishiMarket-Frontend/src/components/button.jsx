import React from "react";

const Button = ({ styles }) => (
  <button type="button" className={`h-1/8 w-1/4 py-2 px-2 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    Get Started
  </button>
);

export default Button;