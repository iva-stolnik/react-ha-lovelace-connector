import React from 'react';
import { createRoot } from 'react-dom/client';
import MyComponent from './App';

class ReactCustomCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.root = null;
    this._config = {};
    this._hass = {};
  }

  setConfig(value) {
    this._config = value;
    this.updateComponent();
  }

  set hass(value) {
    this._hass = value;
    this.updateComponent();
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.shadowRoot.appendChild(mountPoint);
    this.root = createRoot(mountPoint);
    this.updateComponent();
  }

  updateComponent() {
    if (this.root) {
      // Pass config and hass as props directly to the React component
      this.root.render(<MyComponent config={this._config} hass={this._hass} />);
    }
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
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
