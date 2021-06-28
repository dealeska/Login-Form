import { A, Div, RxDiv } from 'reactronic-front'
import { App } from '../models/App'
import { style } from './AppWindow.css'
import { HomePageView } from './HomePage.view'
import { EnterPageView } from './EnterPage.view'
//import { cx } from '@emotion/css'

export function AppWindow(
  app: App) {
  return (
    Div('AppWindow', e => {
      e.className = style.class.AppWindow
      Div('TopLine', e => { e.className = style.class.TopLine })
      Div('Header', e => {
        e.className = style.class.Header
      })
      RxDiv('Body', null, e => {
        e.className = style.class.Body
        if (app.homePage.isActive) {
          HomePageView(app)
        } else if (app.enterPage.isActive) {
          EnterPageView(app)
        }
      })
    })
  )
}
