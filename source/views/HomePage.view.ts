import { Button, Div, Input, RxDiv, RxTextArea, usingParent } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'
import { Authentication } from '../models/Login'

export function HomePageView(app: App) {
  const user = new Authentication()
  user.chackPass('12345678')
  user.chackLogin('anonimus')
  return (
    PageView(app.homePage, e => {
      Div('Description', e => {
        e.className = style.class.Description
        e.innerHTML = 'Test <b>App</b> with reactronic'
      })
      Div('Inputs', e => {
        e.className = style.class.ContentContent
        Input('Login', e => {
          e.className = style.class.Input
          e.placeholder = 'login'
          e.type = 'text'
        })
        Input('Password', e => {
          e.className = style.class.Input
          e.placeholder = 'password'
          e.type = 'password'
        })

        RxDiv('Button', null, e => {
          e.className = style.class.Button
          Div('FindLabel', e => {
            e.className = style.class.FindLabel
            e.textContent = 'Search'
          })
        })
        Div('Description', e => {
          e.className = style.class.Description
          e.innerHTML = user.state
        })
      })
    })
  )
}
