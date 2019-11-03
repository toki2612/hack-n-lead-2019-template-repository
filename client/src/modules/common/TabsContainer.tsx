import * as React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import bind from 'bind-decorator'
// import classnames from 'classnames'
import { action, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { routerStore } from '../../stores/routerStore'
import { Location } from 'history'
import styles from './TabsContainer.module.css'

export interface ITabsConfig {
  name: string
  to: string
  // icon: IconDefinition
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  render?: ((props: RouteComponentProps<any>) => React.ReactNode)
}

type ITabsContainer = {
  tabs: (ITabsConfig | null)[]
}

@observer
export class TabsContainer extends React.Component<ITabsContainer> {

  constructor (p: any, c?: any) {
    super(p,c)

    if (!this.currentTab && this.props.tabs[0]) {
      routerStore.replace(this.props.tabs[0].to)
    }
  }

  @computed
    // number of non null tabs
    get tabsLength () {
      return this.props.tabs.filter(tab => tab).length
    }

  render () {
    const tabs = []
    const routes = []
    for (const tab of this.props.tabs) {
      if (tab) {
        tabs.push(
            <Tab
              className={styles.tab}
              classes={{ selected: styles.selected, wrapper: styles.wrapper }}
              // icon={<FontAwesomeIcon className={styles.icon} icon={tab.icon} />}
              label={tab.name}
              key={tab.to}
              value={tab.to}
            />
          )
        routes.push(
            tab.render ? <Route key={tab.to} path={tab.to} render={tab.render} /> : <Route key={tab.to} path={tab.to} component={tab.component} />
          )
      }
    }

    return (
        <React.Fragment>
          <div className={styles.tabs} >
            <Tabs
              classes={{ root: styles.tabsRoot, indicator: styles.indicator, scrollButtonsDesktop: styles.scrollButtonsDesktop, flexContainer: this.tabsLength <= 3 ? styles.flexContainer : undefined, scroller: styles.scroller }}
              orientation='vertical'
              variant={this.tabsLength > 3 ? 'scrollable' : 'fullWidth'}
              value={this.currentTab}
              onChange={this.tabChanged}
              scrollButtons='auto'
            >
              {tabs}
            </Tabs>
          </div>
          <div className={styles.content} >
            <Switch>
              {routes}
            </Switch>
          </div>
        </React.Fragment>
    )
  }

  @computed
  get currentTab () {
    for (const tab of this.props.tabs) {
      if (tab) {
        let tabTo = tab.to
        if (routerStore.location.pathname.indexOf(tabTo) === 0) {
          return tab.to
        }
      }
    }
    return false
  }

  @bind
  @action
  tabChanged (_event: React.ChangeEvent<{}>, value: string) {
    const location: Location = { pathname: value, search: routerStore.location.search, hash: '', state: undefined }
    routerStore.replace(location)
  }
}
