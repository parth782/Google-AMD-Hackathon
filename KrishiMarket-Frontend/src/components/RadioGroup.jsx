import React, { Component } from "react";
import Option from "./Option";

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.value,
    };
  }

  onSelect = (index) => {
    const { onChange } = this.props;
    this.setState({ selectedIndex: index });
    onChange && onChange(index);
  };

  render() {
    const { options, labelText } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div>
        {labelText && (
          <label className="block text-gray-600 mb-2 text-xs lg:text-sm xl:text-base ">
            {labelText}
          </label>
        )}

        <div className="flex justify-evenly">
          {options.map((el, index) => (
            <Option
              key={index}
              index={index}
              selectedIndex={selectedIndex}
              onSelect={index => this.onSelect(index)}
            >
              {el}
            </Option>
          ))}
        </div>
      </div>
    );
  }
}

export default RadioGroup;
