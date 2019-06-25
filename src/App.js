import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './history'

import Root from './components/Root'
import store from './redux'

// store.dispatch(init());  // Запросы проверки валидности и получения данных пользователя будут инициированы до монтирования приложения

function App() {
  return (
    <Provider store = {store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
