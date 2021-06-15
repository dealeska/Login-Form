import { isolated, ObservableObject, reaction, Ref, unobservable } from 'reactronic'
import { Authentication } from './Login'
import { Page } from './Page'


export class App extends ObservableObject {
  @unobservable readonly version: string

  @unobservable readonly homePage: Page;
  activePage: Page;
  user: Authentication;

  constructor(version: string) {
    super()
    this.version = version
    this.homePage = new Page('/home', '<img src="assets/icon2.svg"/>', 'Login Form')
    this.activePage = this.homePage
    this.activePage.isActive = true
    this.user = new Authentication()
  }
}
