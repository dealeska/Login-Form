import { isolated, ObservableObject, reaction, Ref, unobservable } from 'reactronic'
import { Authentication } from './Authentication'
import { Page } from './Page'


export class App extends ObservableObject {
  @unobservable readonly version: string
  @unobservable readonly homePage: Page;
  @unobservable readonly enterPage: Page;
  @unobservable readonly pages: Page[];
  activePage: Page;
  user: Authentication;

  constructor(version: string) {
    super()
    this.version = version
    this.homePage = new Page('/home', '', 'Login Form')
    this.enterPage = new Page('/enter', '', 'Login Form')
    this.pages = [this.homePage, this.enterPage]
    this.activePage = this.pages[0]
    this.activePage.isActive = true
    this.user = new Authentication()
  }
}
