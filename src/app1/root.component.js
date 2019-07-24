import React from 'react';
import { DatePicker } from 'antd';
// import DatePicker from 'antd/es/date-picker'; // 加载 JS
// import 'antd/es/date-picker/style/css'; // 加载 CSS

export default class Root extends React.Component {
  render() {
    return (
      <div style={{marginTop: '100px'}}>
        This was rendered by app 1, which is written in React.
        <DatePicker />
      </div>
    );
  }
}
