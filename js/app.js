'use strict';

import RadioButtonGroup from './radio-button-group.js';

class App {
  /**
   * Constructs the App class.
   * @param {[[object]]} arrItems - An array of array of items.
   * @param {object} restrictions - An object containing keys as ids
   * and values as arrays of ids that are incompatible with the key.
   */
  constructor(arrItems, restrictions) {
    // Format the items to include the incompatible items.
    const formatted = arrItems.map((items) => items.map((item) => ({
      ...item,
      incompatibleItems: restrictions[item.id] || [],
    })));

    this.groups = formatted.map((items, i) => {
      const group = new RadioButtonGroup(items, `radio-group-${i + 1}`);

      if (i !== 0) {
        group.disableAll();
      }

      return group;
    });
    
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

  // Handle the enabled status of the radio button groups
  // as well as the restrictions.
  this.groups.forEach((group, i, arr) => {
    group.handleChange = (selected) => {
      if (i < arr.length - 1) {
        let incompatible = [];

        for (let j = 0, length = arr.length - 1; j < length; j++) {
          // Enable/disable the succeeding radio buttons depending on the selection.
          if (arr[j].selectedItem) {
            incompatible = incompatible.concat(arr[j].selectedItem.incompatibleItems);
            arr[j + 1].setEnabledItems(incompatible);
          } else {
            arr[j + 1].disableAll();
          }

          // Disable the submit button if there's a group that has no selection.
          if (!arr[j + 1].selectedItem) {
            setSubmitEnabled.call(this, false);
          }
        }
      } else {
        setSubmitEnabled.call(this, true);
      }
    };
  });
}

/**
 * Sets the submit button's enabled status.
 * @param {bool} isEnabled - Boolean value indicating if the submit button should
 * be enabled or disabled.
 */
function setSubmitEnabled(isEnabled) {
  this.element.querySelector('[type=submit]').disabled = !isEnabled;
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
