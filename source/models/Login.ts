import { ObservableObject, reaction, transaction, unobservable } from 'reactronic'
export interface User
{
    login: string
    password: string
}
export class Authentication extends ObservableObject
{
    @unobservable readonly users: User[] = [{login: 'anonimus', password: '12345678'}]
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

    // @reaction
    // checkLogin(): void
    // {
    //   this.users.forEach(e => {
    //     if (e.login == this.login)
    //     {
    //       this.login = this.login
    //       if (this.password != '' && e.password != this.password)
    //       {
    //         this.state = 'true login, pass false'
    //       }
    //       else
    //       {
    //         this.state = 'true login, true pass'
    //       }
    //     }
    //   })
    // }

    // @reaction
    // checkPassword(): void
    // {
    //   if (this.login == '')
    //     this.password = this.password
    //   else
    //     this.users.forEach(e => {
    //       if (e.login == this.login)
    //       {
    //         if (e.password == this.password)
    //         {
    //           this.password = this.password
    //           this.state = 'true login, true pass'
    //         }
    //         else
    //         {
    //           this.state = 'true login, false pass'
    //         }
    //       }
    //     })
    // }

    @reaction
    printInfo(): void {
      if (this.login === 'anonimus' && this.password === '12345678')
        this.state = 'Your are is a user!'
      else
        this.state = 'Go away, stranger'
    }
}