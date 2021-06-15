import { Button, Div, Input, RxDiv, RxTextArea, usingParent } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'
import { Authentication } from '../models/Login'

export function HomePageView(app: App) {
  {
    //const user = new Authentication()
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

          RxDiv('Button', null, e => {
            e.className = style.class.Button
            Div('FindLabel', e => {
              e.className = style.class.FindLabel
              e.textContent = 'Search'
            })
            //Сделать транзакцию
            e.onclick = async () => {
              console.log(app.user.state)
            }
          })
        })

        // Я не понимаю почему оно не видит...
        RxDiv('Description', null, e => {
          e.className = style.class.Description
          //const user = new Authentication()
          e.innerHTML = app.user.state
        })
      })
    )
  }
}