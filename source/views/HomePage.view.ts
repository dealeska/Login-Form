import { Button, Div, Input, RxDiv, RxTextArea, usingParent, A } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App } from '../models/App'
//import { Authentication } from '../models/Authentication'

export function HomePageView(app: App) {
  {
    //const user = new Authentication()
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

          RxDiv('Button', null, e => {
            e.className = style.class.Button
            Div('FindLabel', e => {
              e.className = style.class.FindLabel
              e.textContent = 'Search'
            })
            e.onclick = async () => {
              await app.user.checkUser()
            }
          })
        })

        RxDiv('Description', null, e => {
          e.className = style.class.Error
          e.innerHTML = app.user.stateMessage
        })
        // временная ссылка, но по ней не переходит, но оно и не должно так работать...
        A('Description', e => {
          e.className = style.class.Error
          e.innerHTML = 'Next Page'
          e.href = '/enter'
        })
      })
    )
  }
}