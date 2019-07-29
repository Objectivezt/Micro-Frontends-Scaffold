import React from 'react';
export default class Root extends React.Component {
  componentDidCatch(error, info) {
      console.log(error, info);
  }
  render() {
    let ret =  <div id="loading">
      main Page
    </div>;
    return ret; 
  }
}