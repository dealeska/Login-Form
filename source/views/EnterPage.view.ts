import { Div } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'

export function EnterPageView(app: App) {
  return (
    PageView(app.enterPage, e => {
      Div('Description', e => {
        e.className = style.class.Description
        e.innerHTML = app.authentication.quote
      })
      Div('ButtonContainer', e => {
        e.className = style.class.ButtonContainer
        Div('Button', e => {
          e.className = style.class.Button
          e.eventInfo = { pointer: 'log-out' }
          Div('ButtonLabel', e => {
            e.className = style.class.ButtonLabel
            e.textContent = 'Log Out'
          })
        })
      })
    })
  )
}

