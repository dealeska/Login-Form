export interface Theme {
  readonly name: string

  background: string
  foreground: string
  activeItemMarker: string
  emphasizedText: string
  errorText: string
  titleForeground: string
  formTextAreaBackground: string
  formTextAreaForeground: string
  formTextAreaCaretColor: string
  formFindButtonBackground: string
  formTagButtonBackground: string
}

export class DarkBlueTheme implements Theme {
  readonly name = 'DarkBlueTheme'

  background = '#14344F'
  foreground = '#E0E0E0'
  activeItemMarker = '#00B3FF'
  emphasizedText = '#5DF586'
  errorText = '#ed1c1c'
  titleForeground = '#E0E0E0'
  formTextAreaBackground = 'white'
  formTextAreaForeground = '#444'
  formTextAreaCaretColor = 'black'
  formFindButtonBackground = '#00B831'
  formTagButtonBackground = '#AAA'
}
