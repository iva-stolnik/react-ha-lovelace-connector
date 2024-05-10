import React from 'react';
import { createRoot } from 'react-dom/client';
import MyComponent from './App'; // Adjust the import path as necessary

class ReactCustomCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.root = null; // This will hold the React root
    this._config = {};
    this._hass = {};
  }

  // Use setters to handle reactivity
  setConfig(value) {
    this._config = value;
    this.updateComponent(); // Update the component whenever the config changes
  }

  set hass(value) {
    this._hass = value;
    this.updateComponent(); // Update the component whenever the hass changes
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.shadowRoot.appendChild(mountPoint);
    this.root = createRoot(mountPoint); // Initialize React root
    this.updateComponent(); // Render the component initially with any setup values
  }

  updateComponent() {
    if (this.root) {
      // Pass config and hass as props directly to the React component
      this.root.render(<MyComponent config={this._config} hass={this._hass} />);
    }
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount(); // Clean up the React component
    }
  }
}

window.customCards = window.customCards || [];

if (!window.customCards.some(item => item.type === 'react-custom-card')) {
  window.customCards.push({
    type: 'react-custom-card',
    name: 'React Custom Card',
    preview: true,
    description: 'A custom card created in React',
  });
}

if (!customElements.get('react-custom-card')) {
  customElements.define('react-custom-card', ReactCustomCard);
}
