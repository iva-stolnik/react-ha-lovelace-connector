import React from 'react';

class MyComponent extends React.Component {
  render() {
    const { config, hass } = this.props;

    // Checking if `config` and `hass` are provided and are not null
    const configText = config ? JSON.stringify(config) : 'No configuration provided';
    const hassText = hass ? JSON.stringify(hass) : 'No hass data provided';

    return (
      <div>
        <h1>Configuration</h1>
        <pre>{configText}</pre>
        <h2>Status</h2>
        <pre>{hassText}</pre>
      </div>
    );
  }
}

export default MyComponent;
