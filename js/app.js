'use strict';

import RadioButtonGroup from './radio-button-group.js';

class App {
  /**
   * Constructs the App class.
   * @param {[[object]]} arrItems - An array of array of items.
   * @param {object} restrictions - An object containing keys as ids and values as arrays of ids that are incompatible with the key.
   */
  constructor(arrItems, restrictions) {
    this.groups = arrItems.map((items, i, arr) => new RadioButtonGroup(items, `radio-group-${i + 1}`, i === 0));
    this.restrictions = restrictions;
    init.call(this);
  }
}

/**
 * Initializes the app.
 */
function init() {
  const frag = document.createDocumentFragment();
  const range = document.createRange();
  const template = `<input type="submit" value="Submit" class="btn" disabled>`;

  this.groups.forEach((group) => frag.appendChild(group.element));
  frag.appendChild(range.createContextualFragment(template));
  this.element = document.createElement('form');
  this.element.appendChild(frag);

  // Handle the enabled status of the radio button groups.
  this.groups.forEach((group, i, arr) => {
    if (i < arr.length - 1) {
      group.handleChange = () => {
        arr[i + 1].setEnabled(true);
      };
    }
  });
}

(() => {
  const items = [
    // first group of radio-buttons
    [
      { id: '101', value: 'Vegetarian' },
      { id: '102', value: 'Nut allergy' },
      { id: '103', value: 'Halal' }
    ],
    // second group of radio-buttons
    [
      { id: '201', value: 'Cashew chicken' },
      { id: '202', value: 'Sweet and sour pork' },
      { id: '203', value: 'Stir fried Tofu' },
      { id: '204', value: 'Vegetable fried rice' },
      { id: '205', value: 'Pad Thai' },
      { id: '206', value: 'Massaman beef' },
    ],
    // third group of radio-buttons
    [
      { id: '301', value: 'Peanut sauce' },
      { id: '302', value: 'Oyster sauce' },
      { id: '303', value: 'Vegetable spring rolls' },
      { id: '304', value: 'Steamed rice' },
    ],
  ];
  const restrictions = {
    // 'Vegetarian' is NOT compatible with 'Cashew chicken', 'Sweet and sour pork', 'Massaman beef', 'Oyster sauce'
    101: [201, 202, 206, 302], 
    // 'Nut allergy' is NOT compatible with 'Cashew chicken', 'Peanut sauce',
    102: [201, 301], 
    // 'Halal' is NOT compatible with 'Sweet and sour pork',
    103: [202], 
    // 'Vegetable fried rice' is NOT compatible with 'Steamed rice' (you don't need more rice... carb overload),
    204: [304],
    // 'Pad thai' is NOT compatible with 'Steamed rice' (Pad thai comes with noodles),
    205: [304],
  };
  const app = new App(items, restrictions);

  document.getElementById('app').appendChild(app.element);
})();
