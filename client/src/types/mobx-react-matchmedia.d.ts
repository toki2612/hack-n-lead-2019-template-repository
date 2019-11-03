
declare module 'mobx-react-matchmedia' {
  import * as React from 'react'

  export interface IMatchMediaProviderProps {
    breakpoints: { [name: string]: string | boolean }
  }

  export class MatchMediaProvider extends React.Component<
    IMatchMediaProviderProps
  > {}
}
