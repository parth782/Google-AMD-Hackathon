import React, { Component } from 'react';

class Option extends Component {
  render() {
    const { index, selectedIndex, onSelect, children } = this.props;
    const isSelected = index === selectedIndex;

    return (
      <div
        className={`flex items-center gap-2 shadow cursor-pointer transition duration-300 bg-slate-50 mx-1 rounded-md p-2 py-3 flex-1 text-xs font-bold text-slate-600 lg:font-normal lg:text-sm hover:shadow-md ${
          isSelected ? 'bg-green-50' : ''
        }`}
        onClick={() => onSelect(index)}
      >
        <div
          className={`rounded-full w-4 h-4 border transition ${
            isSelected ? 'border-4 border-sky-500 bg-green-500' : 'border-4 border-sky-500'
          }`}
        ></div>
        {children}
      </div>
    );
  }
}

export default Option;
