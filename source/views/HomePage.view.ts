import { Button, Div, Input } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'

export function HomePageView(app: App) {
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
        Button('Button', e => {
          e.className = style.class.Button
          e.type = 'submit'
          e.innerHTML = 'НАЖМИ'
        })
      })
    })
  )
}
