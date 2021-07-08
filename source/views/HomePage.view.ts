import { Div, Input, RxDiv, RxImg } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'
import { AuthenticationMonitor, State } from '../models/Authentication'

export function HomePageView(app: App) {
  return (
    PageView(app.homePage, e => {
      e.eventInfo = { keyboard: 'log-in' }
      Div('Description', e => {
        e.className = style.class.Description
        e.innerHTML = 'Enter your login and password'
      })
      Div('InputsContainer', e => {
        e.className = style.class.InputsContainer
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
        Div('ButtonInner', e => {
          e.className = style.class.ButtonInner
          Div('Button', e => {
            e.className = style.class.Button
            e.eventInfo = { pointer: 'log-in' }
            Div('ButtonLabel', e => {
              e.className = style.class.ButtonLabel
              e.textContent = 'Log in'
            })
          })
          RxImg('AuthenticationMonitor', null, e => {
            e.className = style.class.AuthenticationIndicator
            e.setAttribute('rx-active', AuthenticationMonitor.isActive ? 'true' : 'false')
            e.src = './assets/loading.svg'
          })
        })
      })
      RxDiv('ErrorMessage', null, e => {
        e.className = style.class.Error
        if (app.authentication.state === State.IncorrectData) {
          e.innerHTML = 'Incorrect username or password'
        } else {
          e.innerHTML = ''
        }
      })
    })
  )
}