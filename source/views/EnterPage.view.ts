import { Button, Div, Input, RxDiv, RxTextArea, usingParent, RxA, A } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './EnterPage.css'
import { App, SensorInfo } from '../models/App'

export function EnterPageView(app: App) {
  return (
    Div('EnterPageView', e => {
      Div('Title', e => {
        e.className = style.class.Title
        e.innerHTML = `Welcome, ${app.authentication.login}!`
      })
      Div('Content', e => {
        e.className = style.class.ContentContent
        Div('Description', e => {
          e.className = style.class.Description
          e.innerHTML = app.authentication.quote
        })
        RxDiv('Button', null, e => {
          e.className = style.class.Button
          e.eventInfo = { pointer: new SensorInfo('log-out') }
          Div('FindLabel', e => {
            e.className = style.class.FindLabel
            e.textContent = 'Log out'
          })
        })
      })
    })
  )
}

