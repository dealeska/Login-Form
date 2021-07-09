import { ObservableObject, reaction, unobservable } from 'reactronic'
import { WebSensors, PointerButton } from 'reactronic-front'
import { Authentication, State } from './Authentication'
import { Page } from './Page'

export class App extends ObservableObject {
  @unobservable readonly homePage: Page
  @unobservable readonly enterPage: Page
  @unobservable readonly sensors: WebSensors
  @unobservable readonly authentication: Authentication

  constructor() {
    super()
    this.sensors = new WebSensors()
    this.homePage = new Page('Login Form')
    this.enterPage = new Page('Welcome!')
    this.authentication = new Authentication()
  }

  @reaction
  protected updateActivePage(): void {
    if (this.authentication.state === State.LoggedIn) {
      this.enterPage.isActive = true
      this.enterPage.title = `Welcome, ${this.authentication.login}!`
      this.homePage.isActive = false
    } else {
      this.homePage.isActive = true
      this.enterPage.isActive = false
    }
  }

  @reaction
  protected async handlePointerClick(): Promise<void> {
    const { pointer } = this.sensors

    if (pointer.click === PointerButton.Left) {
      const infos = pointer.eventInfos
      if (infos[0] === 'log-in') {
        await this.authentication.checkUser()
      } else if (infos[0] === 'log-out') {
        this.authentication.resetFields()
        this.authentication.state = State.LoggedOut
      }
    }
  }

  @reaction
  protected async handleEnterPressed(): Promise<void> {
    const { keyboard } = this.sensors

    if (keyboard.up === 'Enter') {
      const infos = keyboard.eventInfos
      if (infos[0] === 'log-in') {
        await this.authentication.checkUser()
      }
    }
  }
}
