import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './DataView.module.css'
import { CircularProgress, Typography } from '@material-ui/core'
import bind from 'bind-decorator'
import { action, observable, computed } from 'mobx'
import { faCalculator, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IDataViewProps {

}

@observer
export class DataView extends React.Component<IDataViewProps> {

  @observable success: boolean = false
  @observable loading: boolean = false
  timer: any = 0

  @bind
  @action
  setSuccess (value: boolean) {
    this.success = value
  }

  @bind
  @action
  setLoading (value: boolean) {
    this.loading = value
  }

  @bind
  @action
  clickCalculate () {
    if (!this.loading) {
      this.setSuccess(false)
      this.setLoading(true)
      this.timer = setTimeout(() => {
        this.setSuccess(true)
        this.setLoading(false)
      }, 2000)
    }
  }

  @computed
  get messageText () {
    if (this.success) return 'Data ready'
    else if (this.loading) return 'Calculating ...'
    else return 'Calculate'

  }

  render () {
    let message: JSX.Element | null = null
    message = <div className={styles.messageBox}>
              <Typography className={styles.messageText}>{this.messageText}</Typography>
              <div className={styles.iconBox}>
                {this.success ? <FontAwesomeIcon className={styles.checkIcon} icon={faCheck} onClick={this.clickCalculate}/> : <FontAwesomeIcon className={styles.calcIcon} icon={faCalculator} onClick={this.clickCalculate}/>}
                {this.loading && <CircularProgress className={styles.progress} value={20} size={'2.5rem'}/>}
              </div>
            </div>

    return (
      <div className={styles.container}>
        {message}
      </div>
    )
  }
}
