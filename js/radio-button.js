'use strict';

export default class RadioButton {
  /**
   * 
   * @param {string} value - The value of the radio button.
   * @param {string} name - The radio button (group) name.
   * @param {string} label - The label of the radio button.
   * @param {[number]} incompatibleItems - An array of ids (values) incompatible with the item.
   */
  constructor(value, name, label, incompatibleItems) {
    this.value = value;
    this.name = name;
    this.label = label;
    this.incompatibleItems = incompatibleItems;
    init.call(this);
  }

  /**
   * Sets the radio button's enabled status and clears the selection.
   * @param {bool} isEnabled - The boolean value indicating whether
   * to enable or disable the radio button.
   */
  setEnabled(isEnabled) {
    const rb = this.element.querySelector('input');

    rb.disabled = !isEnabled;

    if (!isEnabled) {
      rb.checked = false;
    }
  }
}

/**
 * Initializes the radio button.
 */
function init() {
  const range = document.createRange();
  const template = `
    <label>
      <input type="radio" value="${this.value}" name="${this.name}">
      ${this.label}
    </label>
  `;
  const frag = range.createContextualFragment(template);
  this.element = document.createElement('div');
  this.element.classList.add('radio');
  this.element.appendChild(frag);
}
