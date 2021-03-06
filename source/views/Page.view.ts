import { Div, Render } from 'reactronic-front'
import { Page } from '../models/Page'
import { style } from './Page.css'

export function PageView(page: Page, contentRenderer?: Render<HTMLElement>) {
  return (
    Div('PageView', e => {
      e.className = style.class.Page
      Div('Title', e => {
        e.className = style.class.Title
        e.innerHTML = page.title
      })
      Div('Content', e => {
        e.className = style.class.Content
        if (contentRenderer)
          contentRenderer(e)
      })
    })
  )
}
