import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter } from "react-router-dom";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

import { UptuneProvider } from './context/UptuneContext';
import { MusicProvider } from './context/MusicContext';
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UptuneProvider>
      <MusicProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
      </MusicProvider>
    </UptuneProvider>
  </BrowserRouter>
)
