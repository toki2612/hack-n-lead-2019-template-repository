import { observable } from 'mobx'

export const breakpoints = observable({
  phone: '(max-width: 768px) , (max-height: 480px)',
  desktop: '(min-width: 769px) AND (min-height: 480px))'
} as { phone: string | boolean; desktop: string | boolean })

export type IBreakpoints = typeof breakpoints
