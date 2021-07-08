import { ObservableObject, Monitor, monitor, Reentrance, reentrance, transaction, unobservable } from 'reactronic'

export interface UserCredentials {
  login: string
  password: string
}

export enum State {
  IncorrectData,
  LoggedIn,
  LoggedOut
}

const Delay = 100

export const AuthenticationMonitor = Monitor.create('Authentication Monitor', -1, Delay)

export class Authentication extends ObservableObject {
  @unobservable readonly credentials: UserCredentials[] = [
    { login: 'anonymous', password: '12345678' },
    { login: 'alesya', password: 'yasela' },
    { login: 'test', password: 'test' },
    { login: 'login', password: 'pass' }
  ]
  @unobservable quote: string
  state: State
  login: string
  password: string

  constructor() {
    super()
    this.quote = ''
    this.login = ''
    this.password = ''
    this.state = State.LoggedOut
  }

  @transaction
  setLogin(userLogin: string): void {
    this.login = userLogin
  }

  @transaction
  setPassword(userPassword: string): void {
    this.password = userPassword
  }

  @transaction
  resetFields(): void {
    this.login = ''
    this.password = ''
  }

  @transaction @reentrance(Reentrance.CancelAndWaitPrevious) @monitor(AuthenticationMonitor)
  async checkUser(): Promise<void> {
    const result = await fetch('https://api.adviceslip.com/advice' + '?timestamp=' + Date.now())
    const text = await result.json()
    this.quote = text.slip.advice

    const user = this.credentials.find(u => u.login === this.login && u.password === this.password)

    if (user !== undefined) {
      this.state = State.LoggedIn
    }
    else {
      this.state = State.IncorrectData
    }
  }
}
