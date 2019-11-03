import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './Account.module.css'
import { Typography } from '@material-ui/core'
import { RiskSlider } from '../common/RiskSlider'

interface IAccountProps {
  riskRate: number
  data: any
  id: string
}

@observer
export class Account extends React.Component<IAccountProps> {

  render () {

    const riskData: {[key: string]: any} = {
      risk1: {
        label: 'Channel risk',
        value: Math.random() * 50
      },
      risk2: {
        label: 'Country risk index',
        value: Math.random() * 50
      },
      risk3: {
        label: 'Transaction risk',
        value: Math.random() * 50
      }
    }

    const sliders = []
    for (const id in riskData) {
      const risk = riskData[id]
      sliders.push(
        <RiskSlider key={id} label={risk.label} value={risk.value}/>
      )
    }

    return (
      <div className={styles.container}>
        <div className={styles.mainBox}>
          <div className={styles.riskBox} style={{ backgroundColor: `rgba(255, ${255 - this.props.riskRate * 3}, 0, 1)` }}>
            <Typography className={styles.riskDataText}>{`${this.props.riskRate}%`}</Typography>
          </div>
          <div className={styles.data}>
            <Typography className={styles.numberText}>CH19 2019 0000 0211 0311 5</Typography>
            <div className={styles.subData}>
              <Typography className={styles.dataText}>Account Balance</Typography>
              <Typography className={styles.dataText}>CHF 3'112'019+</Typography>
            </div>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.profileAvatar} style={{ backgroundImage: `url(${this.props.data!.image})` }}>

          </div>
          <div className={styles.profileData}>
            <Typography className={styles.nameText}>{this.props.data!.name}</Typography>
            <Typography className={styles.dataText}>{this.props.data!.country}</Typography>
          </div>
        </div>
        <div className={styles.risks}>
          {sliders}
        </div>
      </div>
    )
  }
}
