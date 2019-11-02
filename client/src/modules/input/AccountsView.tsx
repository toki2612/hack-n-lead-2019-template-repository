import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './AccountsView.module.css'
import { Account } from './Account'

interface IAccountsViewProps {

}

@observer
export class AccountsView extends React.Component<IAccountsViewProps> {

  render () {

    const accounts = []
    for (let i = 0; i < 20; i++) {
      accounts.push(
        <Account key={i} riskRate={60 - i}/>
      )
    }

    return (
      <div className={styles.container}>
        {accounts}
      </div>
    )
  }
}
