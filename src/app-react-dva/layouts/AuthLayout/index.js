import React from 'react';
import { Button, Icon, Drawer, Layout, Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import GlobalHeader from '../../../components/GlobalHeader/index';
import NotFound from '../../containers/404';
import PropTypes from 'prop-types';
import SliderMenu from '../../../components/SliderMenu';
import TabLayout from '../TabLayout';
import GlobalFooter from '../../../components/GlobalFooter';
import classNames from 'classnames';
import logo from '../../../assets/favicon.ico';
import styles from './index.less';
import { ContainerQuery } from 'react-container-query';
import { Route, Redirect, Switch } from 'dva/router';
import { connect } from 'dva';
import { queryLayout, baseRouterUrl, projectName } from '@common/config';
import {
	AuthRouterPass,
	formatterMenu,
	getBashRedirect,
	getRoutes,
	isInArray,
	isUrl,
	showLogoutConfirm
} from '@utils/utils';

const { Content } = Layout;
const redirectData = [];
const tempMenuArr = baseRouterUrl;
@connect(({ globalModel, userModel }) => ({
	collapsed: globalModel.collapsed,
	globalModel,
	userModel
}))
export default class AuthLayout extends React.PureComponent {
	static childContextTypes = {
		location: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			visibleDrawer: false,
			firstRender: false
		};
	}

	componentWillReceiveProps() {
		if (this.state.firstRender) {
			AuthRouterPass(this);
		}
	}

	componentDidMount() {
		
		this.getUserMenu();
	}

	getChildContext() {
		const { location } = this.props;
		return { location };
	}

	getRedirect = item => {
		if (item && item.children) {
			if (item.children[0] && item.children[0].path) {
				redirectData.push({
					from: `${item.path}`,
					to: `${item.children[0].path}`
				});
				item.children.forEach(children => {
					this.getRedirect(children);
				});
			}
		}
	};

	getUserMenu = () => {
		const { dispatch, location, history } = this.props;
		dispatch({ type: 'userModel/getMenuData' }).then(() => {
			const menuData = this.props.userModel.menuData;
			if (!this.state.firstRender) {
				this.getRouterWhiteList(menuData);
			}
			dispatch({
				type: 'globalModel/pushRouterUrl',
				payloadRouterUrl: tempMenuArr
			});

			if (isInArray(tempMenuArr, location.pathname)) {
				this.setState({ firstRender: true });
			} else {
				// history.push('/auth/exception/403');
			}
			dispatch({ type: 'userModel/getCurrentUser' });
		});
	};

	getRouterWhiteList = (data, parentPath = '') =>
		data.map(item => {
			let { path } = item;
			if (!isUrl(path)) {
				path = parentPath + item.path;
			}
			if (item.children) {
				this.getRouterWhiteList(
					item.children,
					`${parentPath}${item.path}/`
				);
			}
			tempMenuArr.push('/' + path);
		});

	handleMenuCollapse = collapsed => {
		this.props.dispatch({
			type: 'globalModel/changeLayoutCollapsed',
			payloadCollapsed: collapsed
		});
	};

	handleMultiPage = isMultiPage => {
		this.props.dispatch({
			type: 'globalModel/changeMultiPage',
			payloadMultiPage: isMultiPage
		});
	};

	handleDrawer = handle => {
		if (handle) {
			this.setState({ visibleDrawer: true });
		} else {
			this.setState({ visibleDrawer: false });
		}
	};

	handleMenuClick = ({ key }) => {
		if (key === 'setting') {
			this.handleDrawer(true);
		} else if (key === 'news') {
			this.props.history.push({ pathname: '/tourist/' });
		}
	};

	render() {
		const {
			collapsed,
			dispatch,
			globalModel,
			location,
			match,
			routerData,
			userModel,
			history
		} = this.props;
		const tasParams = {
			...routerData[location.pathname],
			keys: location.pathname,
			location,
			dispatch: dispatch,
			match,
			history,
			noPermission: routerData['/auth/exception/403'],
			whiteRouter: tempMenuArr
		};
		const { menuData = [], loadingLayoutMenu = true } = userModel;
		const { isMultiPage = true } = globalModel;
		const bashRedirect = getBashRedirect();
		const layout = (
			<Layout>
				<Drawer
					title="基础设置"
					placement="right"
					closable={false}
					onClose={() => this.handleDrawer(false)}
					visible={this.state.visibleDrawer}
				/>
				<SliderMenu
					collapsed={collapsed}
					location={location}
					logo={logo}
					menuData={formatterMenu(menuData)}
					onCollapse={this.handleMenuCollapse}
				/>
				<Layout
					style={collapsed ? { marginLeft: 80 } : { marginLeft: 256 }}
				>
					<GlobalHeader
						collapsed={collapsed}
						currentUser={{ name: '滔' }}
						onCollapse={this.handleMenuCollapse}
						onMenuClick={this.handleMenuClick}
					/>
					<Content className={styles.context}>
						{isMultiPage ? (
							<TabLayout {...tasParams} />
						) : (
							<Switch>
								{redirectData.map(item => (
									<Redirect
										key={item.from}
										exact
										from={item.from}
										to={item.to}
									/>
								))}
								{getRoutes(match.path, routerData).map(item => (
									<Route
										key={item.key}
										path={item.path}
										component={item.component}
										exact={item.exact}
										redirectPath="/auth/exception/403"
									/>
								))}
								<Redirect exact from="/" to={bashRedirect} />
								<Route render={NotFound} />
							</Switch>
						)}
					</Content>
					<GlobalFooter
						links={[]}
						copyright={
							<div>
								Copyright&nbsp;
								<Icon type="copyright" />
								&nbsp;2019 objectivezt
							</div>
						}
					/>
					{/* <Button
						icon="setting"
						onClick={() => this.handleDrawer(true)}
						className={styles.setting}
					/> */}
				</Layout>
			</Layout>
		);

		return (
			<DocumentTitle title={projectName}>
				<ContainerQuery query={queryLayout}>
					{params => (
						<div className={classNames(params)}>
							{loadingLayoutMenu ? (
								<div className={styles.loadingSpin}>
									<Spin size="large" />
								</div>
							) : (
								layout
							)}
						</div>
					)}
				</ContainerQuery>
			</DocumentTitle>
		);
	}
}
