import React from 'react';
import { DatePicker } from 'antd';   
import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import { browserHistory } from 'dva/router';
import {Provider, connect} from 'react-redux';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';

const router = require('./router/index').default;

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: this.props.store,
      globalEventDistributor: this.props.globalEventDistributor,
    };
  }

  componentDidCatch(error, info) {
      console.log(error, info);
  }

  componentDidMount(){
    const app = dva({
      history: browserHistory,
      onError(e) {
        message.error(e.message, ERROR_MSG_DURATION);
      },
    });

    // 2. Plugins
    app.use(createLoading());

    // 3. Model

    // 4. Router
    app.router(router);

    // 5. Start
    app.start('#app1');
  }

  render() {
    let ret =  <div id="loading">
      error Page
    </div>;
    return ret; 
  }
}