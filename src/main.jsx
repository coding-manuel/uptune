import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, Button } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter } from "react-router-dom";

import App from './App'
import { UptuneProvider } from './context/UptuneContext';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UptuneProvider>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </UptuneProvider>
  </BrowserRouter>
)
