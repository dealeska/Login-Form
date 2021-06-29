import { ObservableObject, reaction, Monitor, monitor, Reentrance, reentrance, transaction, unobservable } from 'reactronic'

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
    { login: 'anonimus', password: '12345678' },
    { login: 'alesya', password: 'aysela' },
    { login: 'test', password: 'test' },
    { login: 'login', password: 'pass' }
  ]
  @unobservable quote: string
  state: State
  stateMessage: string
  login: string
  password: string
  constructor() {
    super()
    this.quote = ''
    this.login = ''
    this.password = ''
    this.state = State.LogOut
    this.stateMessage = ''
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
  resetUser(): void {
    this.login = ''
    this.password = ''
  }

  @transaction @reentrance(Reentrance.CancelAndWaitPrevious) @monitor(SearchMonitor)
  async checkUser(): Promise<void> {
    const result = await fetch('https://api.adviceslip.com/advice' + '?timestamp=' + Date.now())

    const text = await result.json()
    this.quote = text.slip.advice
    console.log(this.quote)

    const user = this.users.find(u => u.login === this.login && u.password === this.password)

    if (user !== undefined) {
      this.state = State.LogIn
      this.stateMessage = ''
    }
    else {
      this.state = State.IncorrectData
      this.stateMessage = 'Incorrect username or password'
    }
  }
}
