import { observer } from 'mobx-react'
import * as React from 'react'
import classnames from 'classnames'
import styles from './PortfolioView.module.css'
import { Typography, Tab, Tabs } from '@material-ui/core'
import { Account } from '../input/Account'
import { observable, action } from 'mobx'
import bind from 'bind-decorator'
import { ScatterPlot } from '../charts/ScatterPlot'
// import { BarChart } from '../charts/BarChart'
import { TextButton } from '../common/Buttons'
import { routerStore } from '../../stores/routerStore'
import { PieChart } from '../charts/PieChart'
import { dataStore } from '../../stores/dataStore'

const fakeData: {[key: string]: any} = {
  gus: {
    name: 'Gus Fring',
    country: 'USA',
    image: require('../../resources/img/gus.jpg')
  },
  walter: {
    name: 'Walter White',
    country: 'USA',
    image: require('../../resources/img/walter.jpg')
  },
  jesse: {
    name: 'Jesse Pinkman',
    country: 'USA',
    image: require('../../resources/img/jesse.jpg')
  }
}

interface IAccountsViewProps {

}

@observer
export class PortfolioView extends React.Component<IAccountsViewProps> {
  @observable infoId: any = 'gus'

  componentDidMount () {
    this.setInfo()
  }

  @bind
  @action
  setInfo () {
    this.infoId = this.randomProperty(fakeData)
  }

  @bind
  @action
  backToData () {
    routerStore.push('/data')
  }

  @bind
  @action
  backToAlgo () {
    routerStore.push('/algo')
  }

  @bind
  randomProperty (obj: any) {
    let keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0]
  }

  render () {

    let infoIndividual: JSX.Element | null = null
    if (this.infoId) {
      infoIndividual = <div className={styles.infoSection}>
                          <div className={styles.infoAreaHeader}>
                            <Typography className={styles.infoAreaTitle}>Individual board</Typography>
                          </div>
                          <Account riskRate={56} data={fakeData[this.infoId]} id={this.infoId} key={this.infoId}/>
                        </div>
    }

    const filters: (JSX.Element[]) = []
    for (const id in dataStore.parameters.filters) {
      const filter = dataStore.parameters.filters[id]
      filters.push(
            <Tab
              key={id}
              value={id}
              label={filter.name}
              className={classnames(styles.operatorChip, dataStore.selectedOperator === id ? styles.selected : undefined)}
            />
          )
    }

    let operatorsFilter: JSX.Element | null = null
    if (dataStore.selectedOperator) {
      operatorsFilter = <div className={styles.operatorsFilterContainer}>
                          <Tabs
                            classes={{ root: styles.operatorsFilter, scroller: styles.operatorsFilterScroller, flexContainer: styles.operatorsFlexContainer, indicator: styles.operatorIndicator }}
                            value={dataStore.selectedOperator}
                            onChange={dataStore.setOperatorId}
                          >
                            {filters}
                          </Tabs>
                        </div>
    }

    let infoPortfolio: JSX.Element | null = null
    infoPortfolio = <div className={styles.infoSection}>
                      <div className={styles.infoAreaHeader}>
                        <Typography className={styles.infoAreaTitle}>Portfolio board</Typography>
                      </div>
                      {operatorsFilter}
                      <PieChart graphId='countries' graphTitle=''/>
                    </div>

    return (
      <div className={styles.container}>
        <div className={styles.chartsArea}>
          <div className={styles.buttonsArea}>
            <TextButton text='Back to Data' onClick={this.backToData}/>
            <TextButton text='Back to Algo' onClick={this.backToAlgo} />
          </div>
          <ScatterPlot onPointClick={this.setInfo}/>
          {/* <BarChart graphId='countries' graphTitle=''/> */}
        </div>
        <div className={styles.infoArea}>
          {infoIndividual}
          {infoPortfolio}
        </div>
      </div>
    )
  }
}
