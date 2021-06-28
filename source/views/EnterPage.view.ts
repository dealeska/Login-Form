import { Button, Div, Input, RxDiv, RxTextArea, usingParent, RxA, A } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App, SensorInfo } from '../models/App'

export function EnterPageView(app: App) {
  {
    return (
      // нужны стили нормальные и цитатку еще добавить
      Div('Title', async e => {
        e.className = style.class.Title
        e.innerHTML = `Welcome, ${app.user.login}!`
      }),
      Div('Content', e => {
        e.className = style.class.ContentContent
        Div('Description', async e => {
          e.className = style.class.Description

          const result = await fetch('https://api.adviceslip.com/advice' + '?timestamp=' + Date.now())
            .then(function (response) {
              return response.json()
            })
            .then(function (data) {
              console.log('data', data)
              e.innerHTML = data['slip'].advice
            })
            .catch(err => handle(err))
        }),
        // когда происходит выход, нужно удалять данные из user (сделано)
        // но теперь там сразу красным светится (Enter data and password)
        RxA('Logout' + app.enterPage.link, null, e => {
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
      })
    )
  }
}

function handle(err: any): any {
  throw new Error('Function not implemented.')
}
