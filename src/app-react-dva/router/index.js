import React from 'react';
import dynamic from 'dva/dynamic'; 
import NoFound from '../containers/404';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider, Spin } from 'antd'; 
import { routerRedux, Route, Switch } from 'dva/router';
import { getRouterData } from './map';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
	return <Spin size="large" />;
});

function RouterConfig({ history, app }) { 
	const routerData = getRouterData(app);
	const BlankLayout = routerData['/'].component;
	const ReportLayout = routerData['/report'].component;
	console.log("routerMap:",routerData);
	return (
		<LocaleProvider locale={zhCN}>
			<ConnectedRouter history={history}>
				<Switch>
					{/* 404模版 */}
					<Route path="/404" render={() => <NoFound />} />
					{/* 默认跳转 */}
					<Route path="/loading" component={BlankLayout} exact />
					{/* 报表 */}
					<Route path="/report" component={ReportLayout} strict />
				</Switch>
			</ConnectedRouter>
		</LocaleProvider>
	);
}

export default RouterConfig;
