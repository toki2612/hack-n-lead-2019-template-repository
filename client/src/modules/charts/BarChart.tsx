import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './BarChart.module.css'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import bind from 'bind-decorator'
import { dataStore } from '../../stores/dataStore'

import { classToPlain } from 'class-transformer'

interface IBarChartProps {
  graphId: string
  graphTitle: string
  units?: string
}

@observer
export class BarChart extends React.Component<IBarChartProps> {
  chart = React.createRef<any>()

  render () {
    const series = []

    const data = dataStore.graphs && dataStore.graphs[this.props.graphId] ? classToPlain(dataStore.graphs[this.props.graphId].byOperator[dataStore.selectedOperator]) as any[] : null
    if (data) {
      series.push(...data.map(entry => {
        return {
          data: entry.values,
          color: entry.name === 'Rural' ? { linearGradient: { x1: 1, x2: 0, y1: 1, y2: 0 }, stops: [[0, '#f77624'], [0.5, '#f28f1c'], [1, '#f09819']] } : { linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 }, stops: [[0, '#009faf'], [0.24, '#0090a7'], [0.71, '#00779a'], [1, '#006e95']] },
          shadow: {
            color: '#999',
            offsetX: 0.25,
            offsetY: 0,
            opacity: 0.25,
            width: 1
          },
          name: entry.name,
          animation: {
            duration: 600
          }
        }
      })
      )
    }

    const chartOptions: any = {
      chart: {
        type: 'pie',
        height: '400px',
        style: {
          fontFamily: 'Nunito'
        }
      },
      title: {
        text: this.props.graphTitle,
        align: 'left',
        margin: 50,
        // x: 50,
        style: {
          color: '#aaa',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }
      },
      // todo: demo quickfix for units, find better alternative
      subtitle: (this.props.units ? {
        text: [this.props.units],
        align: 'left',
        style: {
          color: '#ccc',
          fontWeight: 300,
          fontSize: '0.7125rem'
        }
      } : undefined),
      xAxis: {
        categories: data ? dataStore.graphs[this.props.graphId].xAxis : [],
        labels: {
          style: {
            color: '#bbb',
            fontSize: '0.64rem',
            fontWeight: 300
          }
        },
        lineColor: 'transparent',
        offset: 10
      },
      yAxis: {
        min: 0,
        gridLineWidth: 0.5,
        title: {
          text: ''
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray'
          }
        },
        labels: {
          style: {
            color: '#bbb',
            fontSize: '14px',
            fontWeight: 300
          }
        }
        // tickInterval: 25
        // tickLength: -10
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          pointPadding: 0,
          borderWidth: 0
          // pointWidth: this.props.stacked ? 40 : 40 / (data ? data.length : 1)
        },
        line: {
          lineWidth: 2,
          marker: {
            enabled: false
          },
          dashStyle: 'dash'
        },
        series: {
          borderRadius: 2.5

        }
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        x: 0,
        y: 100,
        margin: 50,
        itemMarginTop: 10,
        itemMarginBottom: 10,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        shadow: false,
        symbolPadding: 15,
        itemStyle: {
          color: '#999',
          fontWeight: 'normal'
        }
      },
      series: series
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
