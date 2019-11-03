import React from 'react'
import './App.module.css'
import { observer } from 'mobx-react'
import { Switch, Route } from 'react-router-dom'
import { MatchMediaProvider } from 'mobx-react-matchmedia'
import { Dashboard } from './modules/pages/Dashboard'
import { breakpoints } from './stores/breakpointsStore'
import { dataStore } from './stores/dataStore'

type AppProps = {}

@observer
class App extends React.Component<AppProps> {

  async componentDidMount () {
    await dataStore.load()
  }

  render () {
    let content: JSX.Element | null = null
    content = (
      <Switch>
        <Route path='/:outputUid?' component={Dashboard}/>
      </Switch>
    )
    return (
        <React.Fragment>
          { content }
          <MatchMediaProvider breakpoints={ breakpoints } />
        </React.Fragment>
    )
  }
}

export default App
