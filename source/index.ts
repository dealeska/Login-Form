import { Transaction } from 'reactronic'
import { configureDebugging } from './debugging'
import { App } from './models/App'
import { AppWindow } from './views/AppWindow.view'

configureDebugging()

const app = Transaction.run(() => new App())
AppWindow(app)