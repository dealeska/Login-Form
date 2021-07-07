import { ObservableObject, Monitor, monitor, Reentrance, reentrance, transaction, unobservable } from 'reactronic'

export interface User {
  login: string
  password: string
}

export enum State {
  IncorrectData,
  LogIn,
  LogOut
}

const Delay = 100

export const SearchMonitor = Monitor.create('Search Monitor', -1, Delay)

export class Authentication extends ObservableObject {
  @unobservable readonly users: User[] = [
    { login: 'anonymous', password: '12345678' },
    { login: 'alesya', password: '12345678' },
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
    this.state = State.LogOut
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

  @transaction @reentrance(Reentrance.CancelAndWaitPrevious) @monitor(SearchMonitor)
  async checkUser(): Promise<void> {
    const result = await fetch('https://api.adviceslip.com/advice' + '?timestamp=' + Date.now())
    const text = await result.json()
    this.quote = text.slip.advice

    const user = this.users.find(u => u.login === this.login && u.password === this.password)

    if (user !== undefined) {
      this.state = State.LogIn
    }
    else {
      this.state = State.IncorrectData
    }
  }
}
