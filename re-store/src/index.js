import { h, render } from 'preact'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import store from './app/store'
import App from './app/app'
import './index.css'



render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  window.root
)
