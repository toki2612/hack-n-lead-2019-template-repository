import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './Account.module.css'
import { Typography } from '@material-ui/core'
import { RiskSlider } from '../common/RiskSlider'
import { bind } from 'bind-decorator'

interface IAccountProps {
  riskRate: number
  data: any
  id: string
}

const colors = ['#24ccb8', '#ff5660', '#ffc400']

const riskData = [
  'Account name',
  'Country',
  'Transaction volume',
  'Transaction number in FY',
  'Inactive days',
  'Linked accounts',
  'Specifics (entered by CM)',
  'Risk score'
]

@observer
export class Account extends React.Component<IAccountProps> {

  @bind
  randomColor () {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  render () {

    const riskData1: {[key: string]: any} = {
      risk1: {
        label: 'Account name',
        value: Math.random() * 50
      },
      risk2: {
        label: 'Country',
        value: Math.random() * 50
      },
      risk3: {
        label: 'Transaction volume',
        value: Math.random() * 50
      },
      risk4: {
        label: 'Transaction number in FY',
        value: Math.random() * 50
      },
      risk5: {
        label: 'Inactive days',
        value: Math.random() * 50
      },
      risk6: {
        label: 'Linked accounts',
        value: Math.random() * 50
      },
      risk7: {
        label: 'Specifics (entered by CM)',
        value: Math.random() * 50
      }
    }

    const sliders = []
    for (const id in riskData1) {
      const risk = riskData1[id]
      sliders.push(
        <RiskSlider key={id} label={risk.label} value={risk.value}/>
      )
    }

    return (
      <div className={styles.container}>
        <div className={styles.mainBox}>
          <div className={styles.riskBox} style={{ backgroundColor: this.randomColor() }}>
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
