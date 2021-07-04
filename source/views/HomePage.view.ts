import { Button, Div, Input, RxDiv, RxFragment, usingParent, RxA, RxImg } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App, SensorInfo } from '../models/App'
import { SearchMonitor } from '../models/Authentication'

export function HomePageView(app: App) {
  {
    return (
      PageView(app.homePage, e => {
        e.eventInfo = { keyboard: new SensorInfo('log-in') }
        Div('Description', e => {
          e.className = style.class.Description
          e.innerHTML = 'Enter your login and password'
        })
        Div('Inputs', e => {
          e.className = style.class.ContentContent
          Input('Login', e => {
            e.className = style.class.Input
            e.placeholder = 'login'
            e.type = 'text'
            e.oninput = () => {
              app.authentication.setLogin(e.value)
            }
          })
          Input('Password', e => {
            e.className = style.class.Input
            e.placeholder = 'password'
            e.type = 'password'
            e.oninput = () => {
              app.authentication.setPassword(e.value)
            }
          })


          Div('Result', e => {
            e.className = style.class.Result
            RxDiv('Button', null, e => {
              e.className = style.class.Button
              e.eventInfo = { pointer: new SensorInfo('log-in') }
              Div('FindLabel', e => {
                e.className = style.class.FindLabel
                e.textContent = 'Search'
              })
            })
            RxImg('SearchIndicator', null, e => {
              e.className = style.class.SearchIndicator
              e.setAttribute('rx-active', SearchMonitor.isActive ? 'true' : 'false')
              e.src = './assets/loading.svg'
            })
          })

        })

        RxDiv('Description', null, e => {
          e.className = style.class.Error
          e.innerHTML = app.authentication.stateMessage
        })
      })
    )
  }
}