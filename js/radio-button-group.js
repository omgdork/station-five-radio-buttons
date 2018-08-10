'use strict';

import RadioButton from './radio-button.js';

export default class RadioButtonGroup {
  /**
   * Constructs the radio button group.
   * @param {[object]} items - An array of items.
   * @param {string} item.id - The id (value) of the item.
   * @param {string} item.value - The value (label) of the item.
   * @param {[number]} item.incompatibleItems - An array of ids incompatible with the item.
   * @param {string} name - The radio group name.
   */
  constructor(items, name) {
    this.items = items.map(({ id, value, incompatibleItems }) => new RadioButton(
      id,
      name,
      value,
      incompatibleItems,
    ));
    this.name = name;
    init.call(this);
  }

  /**
   * Sets the radio buttons' enabled status.
   * @param {[number]} incompatibleItems - An array of incompatible item values.
   */
  setEnabledItems(incompatibleItems) {
    this.items.forEach((item) => {
      if (incompatibleItems.includes(parseInt(item.value, 10))) {
        item.setEnabled(false);

        if (this.selectedItem === item) {
          this.selectedItem = null;
        }
      } else {
        item.setEnabled(true);
      }
    });
  }

  /**
   * Disables all the items.
   */
  disableAll() {
    this.items.forEach((item) => item.setEnabled(false));
    this.selectedItem = null;
  }
}

/**
 * Initializes the radio button group.
 */
function init() {
  const frag = document.createDocumentFragment();
  this.items.forEach((item) => frag.appendChild(item.element));
  this.element = document.createElement('div');
  this.element.classList.add('radio-group');
  this.element.appendChild(frag);

  this.element.querySelectorAll(`[name=${this.name}]`).forEach((radio) => {
    radio.addEventListener('change', (e) => {
      this.selectedItem = this.items.find((item) => item.value === e.target.value);

      if (this.handleChange) {
        this.handleChange(e.target.value);
      }
    });
  })
}
