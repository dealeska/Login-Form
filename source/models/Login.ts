import { ObservableObject, reaction, transaction, unobservable } from 'reactronic'
export interface User
{
    login: string
    pass: string
}
export class Authentication extends ObservableObject
{
    @unobservable readonly users: User[] = [{login: 'anonimus', pass: '12345678'}]
    state: string
    login: string
    pass: string
    constructor(){
      super()
      this.login = ''
      this.pass = ''
      this.state = 'nooo'
    }
    @transaction
    chackLogin(login: string): void
    {
      this.users.forEach(e => {
        if (e.login == login)
        {
          this.login = login
          if (this.pass != '' && e.pass != this.pass)
          {
            this.state = 'true login, pass false'
          }
          else
          {
            this.state = 'true login, true pass'
          }
        }
      })
    }
    @transaction
    chackPass(pass: string): void
    {
      if (this.login == '')
        this.pass = pass
      else
        this.users.forEach(e => {
          if (e.login == this.login)
          {
            if (e.pass == pass)
            {
              this.pass = pass
              this.state = 'true login, true pass'
            }
            else
            {
              this.state = 'true login, false pass'
            }
          }
        })
    }
    @reaction
    printInfo(): void {
      if (this.login == '')
        this.state = 'no'
      else
        this.state = 'yes'
    }
}