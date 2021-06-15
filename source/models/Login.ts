import { ObservableObject, reaction, transaction, unobservable } from 'reactronic'

export interface User
{
  login: string
  password: string
}

export class Authentication extends ObservableObject
{
  @unobservable readonly users: User[] = [
    {login: 'anonimus', password: '12345678'},
    {login: 'alesya', password: 'aysela'},
    {login: 'test', password: 'test'},
    {login: 'login', password: 'pass'}
  ]
  state: string
  login: string
  password: string
  constructor(){
    super()
    this.login = ''
    this.password = ''
    this.state = 'enter something'
  }

  @transaction
  setLogin(userLogin: string): void
  {
    this.login = userLogin
  }

  @transaction
  setPassword(userPassword: string): void
  {
    this.password = userPassword
  }

  @reaction
  printInfo(): void {
    if (this.login === '' || this.password === '')
    {
      this.state = 'Enter all data!!!'
    }
    else if (this.login !== '')
    {
      this.state = 'Go away, stranger'
      this.users.forEach(e => {
        if (e.login === this.login)
        {
          if (e.password === this.password)
          {
            this.state = 'Your are is a user!'
          }
          else
          {
            this.state = 'password != your password'
          }
        }
      })
    }
    else{
      this.state = 'Go away, stranger'
    }
  }
}