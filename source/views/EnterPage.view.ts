import { Div, RxDiv, RxImg } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App, SensorInfo } from '../models/App'
import { SearchMonitor } from '../models/Authentication'

export function EnterPageView(app: App) {
  return (
    PageView(app.enterPage, e => {
      Div('Description', e => {
        e.className = style.class.Description
        e.innerHTML = app.authentication.quote
      })
      Div('ButtonContainer', e => {
        e.className = style.class.ButtonContainer
        Div('Result', e => {
          e.className = style.class.ButtonInner
          RxDiv('Button', null, e => {
            e.className = style.class.Button
            e.eventInfo = { pointer: new SensorInfo('log-out') }
            Div('FindLabel', e => {
              e.className = style.class.FindLabel
              e.textContent = 'Log Out'
            })
          })
          RxImg('SearchIndicator', null, e => {
            e.className = style.class.SearchIndicator
            e.setAttribute('rx-active', SearchMonitor.isActive ? 'true' : 'false')
            e.src = './assets/loading.svg'
          })
        })
      })
    })
  )
}

