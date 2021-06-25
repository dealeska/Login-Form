import { ObservableObject, reaction, transaction } from 'reactronic'

export type NavigationParams = Record<string, string | undefined>

export class HashNavigation extends ObservableObject {
  path: string
  params: NavigationParams

  private wasUpdatedFromBrowser: boolean

  constructor() {
    super()
    const hash = location.hash
    const p = parseLocation(hash)
    this.path = p.path || '#/'
    this.params = p.params
    this.wasUpdatedFromBrowser = false
    window.onhashchange = this.browserHashChanged
    console.log('Создание навигации')
  }

  @transaction
  navigate(path: string, parameters: NavigationParams = {}): void {
    this.path = path
    this.params = parameters
    this.wasUpdatedFromBrowser = false
  }

  matches(path: string, exact: boolean = true): boolean {
    return this.path === path || !exact && this.path.startsWith(path)
  }

  @reaction
  protected updateBrowserHistory(): void {
    const path = this.path
    const params = this.params
    if (!this.wasUpdatedFromBrowser) {
      const hash = formatLocation(path, params)
      history.pushState(undefined, '', hash)
    }
  }

  @transaction
  protected browserHashChanged(): void {
    const hash = location.hash // don't exclude # symbol via .substring(1)
    const p = parseLocation(hash)
    this.path = p.path
    this.params = p.params
    this.wasUpdatedFromBrowser = true
    console.log('транзакция browserHashChanged')
    console.log(`hash = ${hash} p = ${p} path = ${this.path}`)
  }
}

function parseLocation(location: string): { path: string, params: NavigationParams } {
  let path: string
  const params: NavigationParams = {}
  const searchPos = location.indexOf('?')
  if (searchPos > -1) {
    path = location.slice(0, searchPos)
    const search = location.slice(searchPos)
    const searchParams = new URLSearchParams(search) // makes decodeURIComponent
    searchParams.forEach((value, key) => params[key] = value)
  }
  else {
    path = location
  }
  return { path, params }
}

function formatLocation(path: string, params: NavigationParams): string {
  let result = path
  const searchParams: string[] = []
  for (const key in params) {
    const value = params[key]
    if (value)
      searchParams.push(`${key}=${encodeURIComponent(value)}`)
  }
  if (searchParams.length > 0)
    result += '?' + searchParams.join('&')
  return result
}
