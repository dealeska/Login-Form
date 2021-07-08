import { ObservableObject, unobservable } from 'reactronic'

export class Page extends ObservableObject {
  @unobservable title: string
  isActive: boolean

  constructor(title: string) {
    super()
    this.title = title
    this.isActive = false
  }
}
