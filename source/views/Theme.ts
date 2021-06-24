export interface Theme {
  readonly name: string

  background: string
  foreground: string
  activeItemMarker: string
  emphasizedText: string
  errorText: string
  titleForeground: string
  playgroundTextAreaBackground: string
  playgroundTextAreaForeground: string
  playgroundTextAreaCaretColor: string
  playgroundFindButtonBackground: string
  playgroundTagButtonBackground: string
}

export class DarkBlueTheme implements Theme {
  readonly name = 'DarkBlueTheme'

  background = '#14344F'
  foreground = '#E0E0E0'
  activeItemMarker = '#00B3FF'
  emphasizedText = '#5DF586'
  errorText = '#ed1c1c'
  titleForeground = '#E0E0E0'
  playgroundTextAreaBackground = 'white'
  playgroundTextAreaForeground = '#444'
  playgroundTextAreaCaretColor = 'black'
  playgroundFindButtonBackground = '#00B831'
  playgroundTagButtonBackground = '#AAA'
}
