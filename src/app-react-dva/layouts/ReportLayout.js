import React, { Fragment } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'dva/router';
import { getRoutes } from '@utils/utils';

const { Header, Content } = Layout;

export default class ReportLayout extends React.Component {
	render() {
		const {  match, routerData } = this.props;
		return (
			<Fragment>
				<Header style={{ backgroundColor: '#B81C24' }}>
				</Header>
				<Content>
					<div style={{ width: '80%', margin: '0 auto' }}>
						<Switch>
							{getRoutes(match.path, routerData).map(item => (
								<Route
									key={item.key}
									path={item.path}
									component={item.component}
									exact={item.exact}
									redirectPath="/auth/exception/403"
								/>
							))}
						</Switch>
					</div>
				</Content>
			</Fragment>
		);
	}
}
