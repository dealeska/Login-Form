import { Div, RxDiv, RxImg } from 'reactronic-front'
import { PageView } from './Page.view'
import { style } from './EnterPage.css'
import { App, SensorInfo } from '../models/App'
import { SearchMonitor } from '../models/Authentication'

export function EnterPageView(app: App) {
<<<<<<< HEAD
  {
    return (
      Div('PageView-', e => {
        e.className = style.class.Page
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
=======
  return (
    PageView(app.enterPage, e => {
      Div('Description', e => {
        e.className = style.class.Description
        e.innerHTML = app.authentication.quote
      })
      Div('ButtonContainer', e => {
        e.className = style.class.ButtonContainer
        Div('Result', e => {
          e.className = style.class.Result
          RxDiv('Button', null, e => {
            e.className = style.class.Button
            e.eventInfo = { pointer: new SensorInfo('log-out') }
            Div('FindLabel', e => {
              e.className = style.class.FindLabel
              e.textContent = 'Log Out'
>>>>>>> 01c95981107049dcd7b2d015551f6711a227dea1
            })
          })
          RxImg('SearchIndicator', null, e => {
            e.className = style.class.SearchIndicator
            e.setAttribute('rx-active', SearchMonitor.isActive ? 'true' : 'false')
            e.src = './assets/loading.svg'
          })
        })
      })
    })
  )
}

