import { ObservableObject, reaction, Reentrance, reentrance, transaction, unobservable } from 'reactronic'

export interface User
{
  login: string
  password: string
}

// переименовать лучше состояния...
export enum States {
  NoData,
  WrongLogin,
  WrongPassword,
  RightUser
}

export class Authentication extends ObservableObject
{
  @unobservable readonly users: User[] = [
    {login: 'anonimus', password: '12345678'},
    {login: 'alesya', password: 'aysela'},
    {login: 'test', password: 'test'},
    {login: 'login', password: 'pass'}
  ]
  state: States
  stateMessage : string
  login: string
  password: string
  constructor(){
    super()
    this.login = ''
    this.password = ''
    this.state = States.NoData
    this.stateMessage = ''
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

  @transaction
  resetUser(): void {
    this.login = ''
    this.password = ''
  }

  @transaction @reentrance(Reentrance.CancelAndWaitPrevious)
  async checkUser(): Promise<void> {
    const result = await fetch('https://api.adviceslip.com/advice' + '?timestamp=' + Date.now())
    // обработать запрос
    // другой api мейби взять

    // возможно как-то лучше вынести в реакцию, но по нажатию кнопки только...
    // появляется с опозданием почему то (иногда)
    if (this.state === States.NoData)
    {
      this.stateMessage = 'Enter login and password'
    } else if (this.state === States.WrongLogin)
    {
      this.stateMessage = 'User with this login doesn`t exist'
    } else if (this.state === States.WrongPassword)
    {
      this.stateMessage = 'Wrong password'
    } else if (this.state === States.RightUser)
    {
      this.stateMessage = ''
    }
  }

  @reaction
  printInfo(): void {
    if (this.login === '' || this.password === '')
    {
      this.state = States.NoData
    }
    else if (this.login !== '')
    {
      this.state = States.WrongLogin
      this.users.forEach(e => {
        if (e.login === this.login)
        {
          if (e.password === this.password)
          {
            this.state = States.RightUser
          }
          else
          {
            this.state = States.WrongPassword
          }
        }
      })
    }
    else {
      // возможно тут другое состояние
      this.state = States.WrongLogin
    }
  }
}