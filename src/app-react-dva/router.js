import React from 'react';
import dynamic from 'dva/dynamic'; 
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider, Spin } from 'antd'; 
import { routerRedux, Route, Switch } from 'dva/router';
import NoFound from './containers/404';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
	return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history }) { 
	return (
		<LocaleProvider locale={zhCN}>
			<ConnectedRouter history={history}>
				<Switch>
					{/* 404模版 */}
					<Route  
						path="/404" render={() => <NoFound />} />
				</Switch>
			</ConnectedRouter>
		</LocaleProvider>
	);
}

export default RouterConfig;
