import { RouterStore } from 'mobx-react-router'

export const routerStore = new RouterStore()

// @ts-ignore
window.routerStore = routerStore
