import { ObservableObject, reaction, unobservable } from 'reactronic'
import { WebSensors, PointerButton } from 'reactronic-front'
import { Authentication, State } from './Authentication'
import { Page } from './Page'

export class SensorInfo {
  constructor(public info: string) { }
}

export class App extends ObservableObject {
  @unobservable readonly homePage: Page
  @unobservable readonly enterPage: Page
  @unobservable readonly pages: Page[]
  @unobservable readonly sensors: WebSensors

  authentication: Authentication

  constructor() {
    super()
    this.sensors = new WebSensors()
    this.homePage = new Page('/home', 'Home', 'Login Form')
    this.enterPage = new Page('/enter', 'Enter', 'Welcome!')
    this.pages = [this.homePage, this.enterPage]
    this.authentication = new Authentication()
  }

  @reaction
  protected updateActivePage(): void {
    if (this.authentication.state == State.LogIn) {
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
    const infos = pointer.eventInfos

    if (pointer.click === PointerButton.Left && infos.length > 0) {
      const tags = infos.map((x) => (x as SensorInfo).info)
      if (tags[0] === 'log-in') {
        await this.authentication.checkUser()
      } else if (tags[0] === 'log-out') {
        this.authentication.resetFields()
        this.authentication.state = State.LogOut
      }
    }
  }

  @reaction
  protected async handleEnterPressed(): Promise<void> {
    const { keyboard } = this.sensors
    const infos = keyboard.eventInfos

    if (keyboard.up === 'Enter') {
      const tags = infos.map((x) => (x as SensorInfo).info)
      console.log(tags)
      if (tags[0] === 'log-in') {
        await this.authentication.checkUser()
      }
    }
  }
}
