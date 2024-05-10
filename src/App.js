import React from 'react';

class MyComponent extends React.Component {
  // Method to call a service
  callService = (domain, service, serviceData) => {
    if (this.props.hass && this.props.hass.callService) {
      this.props.hass.callService(domain, service, serviceData);
    } else {
      console.error("Home Assistant instance (hass) or callService method is not available.");
    }
  }
  // Method to call a WebSocket
  callWebSocket = (type,domain,service,target,serviceData) => {
    if (this.props.hass && this.props.hass.callWS) {
      const message = {
          type: type,
          domain: domain,  
          service: service, 
          target: target,
          service_data: serviceData 
      };
      this.props.hass.callWS(message);
    }
    else {
      console.error("Home Assistant instance (hass) or callWS method is not available.");
    }
  }

  render() {
    const { config, hass } = this.props;

    const configText = config ? JSON.stringify(config) : 'No configuration provided';
    const hassText = hass ? 'HA connected' : 'No hass data provided';

    return (
      <div>
        <h1>Configuration</h1>
        <pre>{configText}</pre>
        <h2>Status: {hassText}</h2>
        <div>
          <button onClick={() => this.callService('light', 'toggle', { entity_id: 'light.wl_office_1' })}>
            Toggle Light (call service)
          </button>
        </div>
        <div>
          <button onClick={() => this.callWebSocket('call_service', 'light', 'toggle', { entity_id: 'light.wl_office_1' })}>
            Toggle Light (call websocket)
          </button>
        </div>
      </div>
    );
  }
}

export default MyComponent;
