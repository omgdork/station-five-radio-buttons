'use strict';

import RadioButton from './radio-button.js';

export default class RadioButtonGroup {
  /**
   * 
   * @param {[object]} items - An array of items.
   * @param {string} item.id - The id (value) of the item.
   * @param {string} item.value - The value (label) of the item.
   * @param {string} name - The radio group name.
   * @param {bool} isEnabled - Boolean value indiciting whether the radio group is enabled or disabled.
   */
  constructor(items, name, isEnabled, handleChange) {
    this.items = items.map(({ id, value }) => new RadioButton(id, name, value, isEnabled));
    this.name = name;
    this.selected = null;
    init.call(this);
  }

  /**
   * Sets the radio button group's enabled status.
   * @param {bool} isEnabled - The boolean value indicating whether to enable or disable the radio button group.
   */
  setEnabled(isEnabled) {
    this.items.forEach((item) => item.setEnabled(isEnabled));
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
      if (this.handleChange) {
        this.handleChange(e.target.value);
      }
    });
  })
}
