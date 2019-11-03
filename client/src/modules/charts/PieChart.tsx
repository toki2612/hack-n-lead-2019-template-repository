import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './PieChart.module.css'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { dataStore } from '../../stores/dataStore'

import { classToPlain } from 'class-transformer'

interface IPieChartProps {
  graphId: string
  graphTitle: string
  units?: string
}

@observer
export class PieChart extends React.Component<IPieChartProps> {
  chart = React.createRef<any>()

  render () {
    const series = []

    const data = dataStore.graphs && dataStore.graphs[this.props.graphId] ? classToPlain(dataStore.graphs[this.props.graphId].byOperator[dataStore.selectedOperator]) as any[] : null
    if (data) {
      series.push(...data.map(entry => {
        return {
          y: entry.y,
          // color: entry.name === 'Rural' ? { linearGradient: { x1: 1, x2: 0, y1: 1, y2: 0 }, stops: [[0, '#f77624'], [0.5, '#f28f1c'], [1, '#f09819']] } : { linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 }, stops: [[0, '#009faf'], [0.24, '#0090a7'], [0.71, '#00779a'], [1, '#006e95']] },
          shadow: {
            color: '#999',
            offsetX: 0.25,
            offsetY: 0,
            opacity: 0.25,
            width: 1
          },
          name: 'gflkdg',
          animation: {
            duration: 600
          }
        }
      })
      )
    }

    const chartOptions: any = {
      chart: {
        height: '300px',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'Nunito'
        }
      },
      colors: ['#24ccb8', '#ff5660', '#ffc400'],
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Brands',
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 13.84
        }, {
          name: 'Firefox',
          y: 8.85
        }]
      }]
    }

    return (
      <div className={styles.container}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={this.chart}
        />
      </div>
    )
  }
}
