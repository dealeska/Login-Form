import { Button, Div, Input, RxDiv, RxFragment, usingParent, RxA } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App, SensorInfo} from '../models/App'
import { States } from '../models/Authentication'

export function HomePageView(app: App) {
  {
    return (
      PageView(app.activePage, e => {
        Div('Description', e => {
          e.className = style.class.Description
          if (app.activePage === app.pages[1]) {
            e.innerHTML = 'Enter'
          }
          else {
            e.innerHTML = 'Enter your login and password'
          }
        })
        Div('Inputs', e => {
          e.className = style.class.ContentContent
          Input('Login', e => {
            e.className = style.class.Input
            e.placeholder = 'login'
            e.type = 'text'
            e.oninput = () => {
              app.user.setLogin(e.value)
            }
          })
          Input('Password', e => {
            e.className = style.class.Input
            e.placeholder = 'password'
            e.type = 'password'
            e.oninput = () => {
              app.user.setPassword(e.value)
            }
          })

          RxA('Log-in' + app.enterPage.link, null, eLink => {
            eLink.eventInfo = { pointer: new SensorInfo('log-in') }
            RxDiv('Button', null, e => {
              e.className = style.class.Button
              Div('FindLabel', e => {
                e.className = style.class.FindLabel
                e.textContent = 'Search'
              })
              if (app.user.state == States.RightUser) {
                eLink.href = app.enterPage.hashLink
              } else {
                eLink.href = app.homePage.hashLink
              }
            })
          })
        })

        RxDiv('Description', null, e => {
          e.className = style.class.Error
          e.innerHTML = app.user.stateMessage
        })
      })
    )
  }
}