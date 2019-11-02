import React from 'react'
import ReactDOM from 'react-dom'
import './index.module.css'
import * as serviceWorker from './serviceWorker'

import { appTheme } from './AppTheme'
import { createHashHistory } from 'history'
import { Router, Route } from 'react-router-dom'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { syncHistoryWithStore } from 'mobx-react-router'
import { routerStore } from './stores/routerStore'

declare global {
  interface Window { debug: {[key: string]: any} }
}

const browserHistory = createHashHistory()
const history = syncHistoryWithStore(browserHistory, routerStore)

async function render () {
  const App = (await import('./App')).default
  ReactDOM.render(
    <StylesProvider injectFirst >
      <ThemeProvider theme={appTheme} >
        <React.Fragment>
          <Router history={history}>
            <Route component={App} props />
          </Router>
        </React.Fragment>
      </ThemeProvider>
    </StylesProvider>,
    document.getElementById('root'))
}
render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
