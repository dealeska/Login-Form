import { ObservableObject, reaction, transaction, unobservable } from 'reactronic'
import { WebSensors, PointerButton } from 'reactronic-front'
import { Authentication } from './Authentication'
import { Page } from './Page'
import { HashNavigation } from './HashNavigation'


export class App extends ObservableObject {
  @unobservable readonly version: string
  @unobservable readonly navigation: HashNavigation
  @unobservable readonly homePage: Page;
  @unobservable readonly enterPage: Page;
  @unobservable readonly pages: Page[];
  @unobservable readonly sensors: WebSensors;

  activePage: Page;
  user: Authentication;

  constructor(version: string) {
    super()
    this.navigation = new HashNavigation()
    this.sensors = new WebSensors()
    this.version = version
    this.homePage = new Page('/home', 'Home', 'Login Form')
    this.enterPage = new Page('/enter', 'Enter', 'Login Form')
    this.pages = [this.homePage, this.enterPage]
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
  }

  @reaction
  protected handlePointerClick(): void {
    const { pointer } = this.sensors
    const infos = pointer.eventInfos

    if (pointer.click === PointerButton.Left && infos.length > 0) {
      //const tags = infos.map((x) => (x as Tag).name).join(", ");
      //alert(tags);
      console.log(infos)
    }
  }
}
