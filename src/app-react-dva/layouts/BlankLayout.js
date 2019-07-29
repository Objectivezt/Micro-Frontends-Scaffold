import React from 'react';
import { Spin } from 'antd'; //eslint-disable-line
export default class BlankLayout extends React.Component {
	// componentDidMount() {
	// 	this.props.history.push({
	// 		pathname: '/tourist'
	// 	});
	// }
	render() {
		return (
			<div
				style={{
					width: '100%',
					height: '100%',
					margin: 'auto',
					paddingTop: 50,
					textAlign: 'center'
				}}
			>
				<Spin size="large" />
			</div>
		);
	}
}
