
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const renderApp = () => {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        console.error("Could not find root element to mount to - checking DOM readiness");
        // Fallback or retry logic could go here, but usually DOMContentLoaded covers it.
        return;
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
};

// Ensure DOM is ready before mounting
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}
