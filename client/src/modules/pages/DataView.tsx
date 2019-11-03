import { observer } from 'mobx-react'
import * as React from 'react'
import classnames from 'classnames'
import styles from './DataView.module.css'
import { CircularProgress, Typography, Checkbox, FormControlLabel } from '@material-ui/core'
import bind from 'bind-decorator'
import { action, observable, computed } from 'mobx'
import { faCalculator, faCheck, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const basicFeatures: string[] = ['category', 'turnover', 'io ratio', 'inactive days average']
const proFeatures: string[] = ['country risk index', 'transaction value', 'inactive days ratio']

interface IDataViewProps {
  type: 'data' | 'algo'
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
    if (this.props.type === 'data') {
      if (this.success) return 'Data was uploaded'
      else if (this.loading) return 'Uploading ...'
      else return 'Upload'
    } else if (this.props.type === 'algo') {
      if (this.success) return 'Results are ready'
      else if (this.loading) return 'Calculating ...'
      else return 'Calculate'
    } else return ''
  }

  render () {

    let featureBox: JSX.Element | null = null
    if (this.props.type === 'algo') {
      let features = []
      for (let i = 0; i < basicFeatures.length; i++) {
        features.push(
          <FormControlLabel
            key={i}
            classes={{ label: styles.featureLabel }}
            control={
              <Checkbox
                classes={{ root: styles.checkbox, checked: styles.checked, colorPrimary: styles.checkbox }}
                // checked={state.checkedB}
                // onChange={handleChange('checkedB')}
                value='checkedB'
                color='primary'
              />
            }
            label={basicFeatures[i]}
          />
        )
      }

      let moreFeatures = []
      for (let i = 0; i < proFeatures.length; i++) {
        moreFeatures.push(
          <FormControlLabel
          classes={{ label: styles.featureLabel }}
          key={i}
          control={
            <Checkbox
            classes={{ root: styles.checkbox, checked: styles.checked, colorPrimary: styles.checkbox }}
              // checked={state.checkedB}
              // onChange={handleChange('checkedB')}
              value='checkedB'
              color='primary'
            />
          }
          label={proFeatures[i]}
        />
        )
      }
      featureBox = <div className={styles.featureBox}>
                    <div className={styles.featureSection}>
                    <Typography className={styles.featuresTitle}>Basic features</Typography>
                      {features}
                    </div>
                    <div className={styles.featureSection}>
                      <Typography className={styles.featuresTitle}>Pro features</Typography>
                     {moreFeatures}
                    </div>
                  </div>
    }

    let message: JSX.Element | null = null
    message = <div className={classnames(styles.messageBox, this.props.type === 'data' ? styles.messageData : undefined)}>
                <div className={styles.messageContent}>
                <Typography className={styles.messageText}>{this.messageText}</Typography>
                <div className={styles.iconBox}>
                  {this.success ? <FontAwesomeIcon className={styles.checkIcon} icon={faCheck} onClick={this.clickCalculate}/> : <FontAwesomeIcon className={styles.calcIcon} icon={this.props.type === 'algo' ? faCalculator : faUpload} onClick={this.clickCalculate}/>}
                  {this.loading && <CircularProgress className={styles.progress} value={20} size={'2.5rem'}/>}
                </div>
                </div>
              </div>

    return (
      <div className= { styles.container } >
        { featureBox }
        { message }
      </div >
    )
  }
}
