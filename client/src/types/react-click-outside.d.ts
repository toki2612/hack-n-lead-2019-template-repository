declare module 'react-click-outside' {
  import * as React from 'react'

  export function enhanceWithClickOutside<P> (wrappedComponent: P): P

  export default enhanceWithClickOutside
}
