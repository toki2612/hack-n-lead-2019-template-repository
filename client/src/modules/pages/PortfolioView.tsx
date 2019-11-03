import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './PortfolioView.module.css'
import { Typography } from '@material-ui/core'
import { Account } from '../input/Account'
import { observable, action } from 'mobx'
import bind from 'bind-decorator'
import { ScatterPlot } from '../charts/ScatterPlot'
import { BarChart } from '../charts/BarChart'

const fakeData: {[key: string]: any} = {
  gus: {
    name: 'Gus Fring',
    country: 'USA'
  },
  walter: {
    name: 'Walter White',
    country: 'USA'
  }
}

interface IAccountsViewProps {

}

@observer
export class PortfolioView extends React.Component<IAccountsViewProps> {
  @observable infoId: string = 'gus'

  @bind
  @action
  setInfo (id: string) {
    this.infoId = id
  }

  render () {

    let info: JSX.Element | null = null
    if (this.infoId) {
      info = <div className={styles.infoArea}>
                <div className={styles.infoAreaHeader}>
                  <Typography className={styles.infoAreaTitle}>Individual board</Typography>
                </div>
                <Account riskRate={56}/>
              </div>
    }

    return (
      <div className={styles.container}>
        <div className={styles.chartsArea}>
          <ScatterPlot />
          <BarChart graphId='countries' graphTitle=''/>
        </div>
        {info}
      </div>
    )
  }
}
