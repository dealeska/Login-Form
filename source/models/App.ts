import { isolated, ObservableObject, reaction, Ref, transaction, unobservable } from 'reactronic'
import { Authentication } from './Authentication'
import { Page } from './Page'
import { HashNavigation } from './HashNavigation'


export class App extends ObservableObject {
  @unobservable readonly version: string
  @unobservable readonly navigation: HashNavigation
  @unobservable readonly homePage: Page;
  @unobservable readonly enterPage: Page;
  @unobservable readonly pages: Page[];
  activePage: Page;
  user: Authentication;

  constructor(version: string) {
    super()
    this.navigation = new HashNavigation()
    this.version = version
    this.homePage = new Page('/home', 'Home', 'Login Form')
    this.enterPage = new Page('/enter', 'Enter', 'Login Form')
    this.pages = [this.homePage, this.enterPage]

    // вот тут если поставить pages[1] то открывает страницу EnterPage (ну на всякий случай)
    // надо понять как менять activePage...
    this.activePage = this.pages[0]
    this.activePage.isActive = true
    this.user = new Authentication()
  }

  @reaction
  protected updateActivePage(): void {
    const path = this.navigation.path
    const newActivePage = this.pages.find(value => path.startsWith(value.hashLink))
    if (newActivePage instanceof Page) {
      newActivePage.isActive = true
      this.activePage = newActivePage
      this.pages.forEach(x => {
        if (x !== newActivePage)
          x.isActive = false
      })
    }
    else {
      // Navigation path doesn't correspond any page
      isolated(() => this.navigation.navigate(this.homePage.hashLink)) // recursive call to updateActivePage
    }
  }
}
