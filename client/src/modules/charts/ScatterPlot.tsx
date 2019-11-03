import { observer } from 'mobx-react'
import * as React from 'react'
// import classnames from 'classnames'
import styles from './ScatterPlot.module.css'
import * as Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
import HighchartsReact from 'highcharts-react-official'
import bind from 'bind-decorator'
import { enhanceWithClickOutside } from 'react-click-outside'
import { action } from 'mobx'
highcharts3d(Highcharts)

interface IScatterPlotProps {
  onPointClick? (val?: any): void
  clickOutside? (): void
}

// @enhanceWithClickOutside
@observer
// @enhanceWithClickOutside
export class ScatterPlot extends React.Component<IScatterPlotProps> {
  chart = React.createRef<any>()

  handleClickOutside () {
    if (this.props.clickOutside) this.props.clickOutside()
  }

  @bind
  getColors (chart: Highcharts.Chart) {
    // if (this.chart && this.chart.current) {
    // const newColors = colors.map((color: any) => {
    //   return {
    //     radialGradient: {
    //       cx: 0.4,
    //       cy: 0.3,
    //       r: 0.5
    //     },
    //     stops: [
    //         [0, color],
    //         [1, color.brighten(-0.2).get('rgb')]
    //     ]
    //   }
    // })
    // console.log(newColors)
    // return newColors
    // }
  }

  @bind
  @action
  clickPoint () {
    if (this.props.onPointClick) this.props.onPointClick()
  }

  @bind
  addChartRotation (chart: any) {
    this.getColors(chart)
    const H = Highcharts

    const dragStart = (eStart: any) => {
      eStart = chart.pointer.normalize(eStart)

      let posX = eStart.chartX
      let posY = eStart.chartY
      let alpha = chart.options.chart.options3d.alpha
      let beta = chart.options.chart.options3d.beta
      let sensitivity = 5 // lower is more sensitive
      let handlers: any = []

      const drag = (e: any) => {
          // Get e.chartX and e.chartY
        e = chart.pointer.normalize(e)

        chart.update(
          {
            chart: {
              options3d: {
                alpha: alpha + (e.chartY - posY) / sensitivity,
                beta: beta + (posX - e.chartX) / sensitivity
              }
            }
          },
            undefined,
            undefined,
            false
          )
      }

      const unbindAll = () => {
        handlers.forEach(function (unbind: any) {
          if (unbind) {
            unbind()
          }
        })
        handlers.length = 0
      }

      handlers.push(H.addEvent(document, 'mousemove', drag))
      handlers.push(H.addEvent(document, 'touchmove', drag))

      handlers.push(H.addEvent(document, 'mouseup', unbindAll))
      handlers.push(H.addEvent(document, 'touchend', unbindAll))
    }

    H.addEvent(chart.container, 'mousedown', dragStart)
    H.addEvent(chart.container, 'touchstart', dragStart)
  }

  render () {

    const chartOptions: any = {
      chart: {
        renderTo: 'container',
        margin: 100,
        backgroundColor: 'transparent',
        type: 'scatter3d',
        animation: true,
        style: {
          fontFamily: 'Nunito'
        },
        options3d: {
          enabled: true,
          alpha: 10,
          beta: 30,
          depth: 250,
          viewDistance: 5,
          fitToPlot: false,
          frame: {
            bottom: { size: 1, color: 'transparent' },
            back: { size: 1, color: 'transparent' },
            side: { size: 1, color: 'transparent' }
          }
        }
      },
      // colors: this.getColors(),
      title: {
        text: 'Account cluster'
      },
      plotOptions: {
        scatter: {
          width: 10,
          height: 10,
          depth: 10
        }
      },
      yAxis: {
        min: 0,
        max: 10,
        title: null,
        gridLineWidth: 0,
        labels: {
          enabled: false
        }
      },
      xAxis: {
        min: 0,
        max: 10,
        gridLineWidth: 0,
        labels: {
          enabled: false
        }
      },
      zAxis: {
        min: 0,
        max: 10,
        showFirstLabel: false,
        gridLineWidth: 0,
        labels: {
          enabled: false
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Reading',
        colorByPoint: true,
        data: [
        [1, 6, 5], [8, 7, 9], [1, 3, 4], [4, 6, 8], [5, 7, 7], [6, 9, 6],
        [7, 0, 5], [2, 3, 3], [3, 9, 8], [3, 6, 5], [4, 9, 4], [2, 3, 3],
        [6, 9, 9], [0, 7, 0], [7, 7, 9], [7, 2, 9], [0, 6, 2], [4, 6, 7],
        [3, 7, 7], [0, 1, 7], [2, 8, 6], [2, 3, 7], [6, 4, 8], [3, 5, 9],
        [7, 9, 5], [3, 1, 7], [4, 4, 2], [3, 6, 2], [3, 1, 6], [6, 8, 5],
        [6, 6, 7], [4, 1, 1], [7, 2, 7], [7, 7, 0], [8, 8, 9], [9, 4, 1],
        [8, 3, 4], [9, 8, 9], [3, 5, 3], [0, 2, 4], [6, 0, 2], [2, 1, 3],
        [5, 8, 9], [2, 1, 1], [9, 7, 6], [3, 0, 2], [9, 9, 0], [3, 4, 8],
        [2, 6, 1], [8, 9, 2], [7, 6, 5], [6, 3, 1], [9, 3, 1], [8, 9, 3],
        [9, 1, 0], [3, 8, 7], [8, 0, 0], [4, 9, 7], [8, 6, 2], [4, 3, 0],
        [2, 3, 5], [9, 1, 4], [1, 1, 4], [6, 0, 2], [6, 1, 6], [3, 8, 8],
        [8, 8, 7], [5, 5, 0], [3, 9, 6], [5, 4, 3], [6, 8, 3], [0, 1, 5],
        [6, 7, 3], [8, 3, 2], [3, 8, 3], [2, 1, 6], [4, 6, 7], [8, 9, 9],
        [5, 4, 2], [6, 1, 3], [6, 9, 5], [4, 8, 2], [9, 7, 4], [5, 4, 2],
        [9, 6, 1], [2, 7, 3], [4, 5, 4], [6, 8, 1], [3, 4, 0], [2, 2, 6],
        [5, 1, 2], [9, 9, 7], [6, 9, 9], [8, 4, 3], [4, 1, 7], [6, 2, 5],
        [0, 4, 9], [3, 5, 9], [6, 9, 1], [1, 9, 2]]
      }]
    }

    return (
      <div className={styles.container} onClick={this.clickPoint}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={this.chart}
          callback={this.addChartRotation}
        />
      </div>
    )
  }
}
