import { ObservableObject, reaction, transaction, unobservable } from 'reactronic'
import { WebSensors, PointerButton, Keyboard } from 'reactronic-front'
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
    this.enterPage = new Page('/enter', 'Enter', 'Welcom!')
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
      console.log(tags)
      if (tags[0] === 'log-in') {
        await this.authentication.checkUser()
      } else if (tags[0] === 'log-out') {
        this.authentication.resetUser()
        this.authentication.state = State.LogOut
      }
    }
  }

  // срабатывает не с первого раза (не всегда переходит на страницу)
  @reaction
  protected async handleEnterPressed(): Promise<void> {
    const { keyboard } = this.sensors
    const infos = keyboard.eventInfos
    console.log('нажатие на кнопку')
    if (keyboard.down === 'Enter') {
      const tags = infos.map((x) => (x as SensorInfo).info)
      console.log(tags)
      if (tags[0] === 'log-in') {
        await this.authentication.checkUser()
      } else if (tags[0] === 'log-out') {
        this.authentication.resetUser()
        this.authentication.state = State.LogOut
      }
    }
  }
}
