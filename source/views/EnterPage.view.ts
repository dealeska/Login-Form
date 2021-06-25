import { Button, Div, Input, RxDiv, RxTextArea, usingParent } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'

export function EnterPageView(app: App) {
  {
    return (
      Div('Description', e => {
        e.className = style.class.Title
        e.innerHTML = 'Next Page'
      })
    )
  }
}