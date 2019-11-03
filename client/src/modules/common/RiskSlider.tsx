import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './RiskSlider.module.css'
import { Typography, Slider } from '@material-ui/core'

interface IRiskSliderProps {
  label: string
  value: number
}

@observer
export class RiskSlider extends React.Component<IRiskSliderProps> {

  render () {
    return (
      <div className={styles.container}>
        <Typography className={styles.dataText}>{this.props.label}</Typography>
        <Slider
          className={styles.slider}
          aria-label='custom thumb label'
          defaultValue={this.props.value}
        />
      </div>
    )
  }
}
