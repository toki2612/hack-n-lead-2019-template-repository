import { observable, runInAction, computed, action } from 'mobx'

import 'reflect-metadata'
import { plainToClass } from 'class-transformer'

import axios from 'axios'
import bind from 'bind-decorator'

interface IDataParameters {
  filters: {
    [operatorId: string]: {
      name: string
      color: string
    }
  }
}

interface IDataGraphEntry {
  filter: string
  name: string
  values: number[]
}

class DataGraph {
  @observable name: string = ''
  @observable xAxis: number[] | string[] = []
  @observable data: IDataGraphEntry[] = []

  @computed get byOperator () {
    // group this.data by operatorName
    let data: {[operatorName: string]: IDataGraphEntry[]} = {}

    for (let entry of this.data) {
      if (!data[entry.filter]) {
        data[entry.filter] = []
      }
      data[entry.filter].push(entry)
    }

    return data
  }
}

class DataStore {
  @observable parameters: IDataParameters = { filters: {} }
  @observable graphsList: DataGraph[] = []
  @observable selectedOperator: string = ''

  constructor () {
    this.load().catch(console.error)
  }

  @computed get graphs () {
    // convert list to object by using .name as key
    return this.graphsList.reduce((map: {[graphName: string]: DataGraph}, obj) => {
      map[obj.name] = obj
      return map
    }, {})
  }

  @bind
  @action
  setOperatorId (event: any, id: string) {
    this.selectedOperator = id
  }

  async load () {
    let res = await axios.get('data/data.json')

    runInAction(() => {
      this.parameters = res.data.parameters
      this.graphsList = res.data.graphs.map((entry: DataGraph) => plainToClass(DataGraph, entry))

      if (Object.keys(this.parameters.filters).length) {
        this.selectedOperator = Object.keys(this.parameters.filters)[0]
      }
    })

    // @ts-ignore
    window.debugDataStore = this
  }
}

export const dataStore = new DataStore()
