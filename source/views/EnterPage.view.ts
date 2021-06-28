import { Button, Div, Input, RxDiv, RxTextArea, usingParent, RxA, A } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App, SensorInfo } from '../models/App'

export function EnterPageView(app: App) {
  {
    return (
      // нужны стили нормальные и цитатку еще добавить
      Div('Description', e => {
        e.className = style.class.Title
        e.innerHTML = `Welcome, ${app.user.login}!`
      }),
      // когда происходит выход, нужно удалять данные из user (сделано)
      // но теперь там сразу красным светится (Enter data and password)
      RxA('Log-out' + app.enterPage.link, null, e => {
        e.eventInfo = { pointer: new SensorInfo('log-out') }
        e.href = app.homePage.hashLink
        RxDiv('Button', null, e => {
          e.className = style.class.Button
          Div('FindLabel', e => {
            e.className = style.class.FindLabel
            e.textContent = 'Log out'
          })
        })
      })
    )
  }
}