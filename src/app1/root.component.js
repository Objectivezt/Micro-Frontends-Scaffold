import React from 'react';
import { DatePicker } from 'antd';   

export default class Root extends React.Component {
  render() {
    return (
      <div>
        This was rendered by app 1, which is written in React.
        <DatePicker />
      </div>
    );
  }
}
