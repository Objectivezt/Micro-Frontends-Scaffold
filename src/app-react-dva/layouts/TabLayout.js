import React from 'react';
import { Tabs, message } from 'antd';
import { routerRedux } from 'dva/router';
import { isInArray } from '@utils/utils';

const TabPane = Tabs.TabPane;
export default class TabLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: null,
			panes: []
		};
	}

	componentWillMount() {
		const { name, keys, component } = this.props;
		if (keys === '/' || !name) {
			return;
		}
		const panes = this.state.panes;
		const activeKey = keys;
		panes.push({ name, key: activeKey, component });
		this.setState({ panes, activeKey });
	}

	componentWillReceiveProps(nextProps) {
		const {
			location,
			whiteRouter,
			noPermission,
			name,
			keys,
			component
		} = nextProps;
		if (!isInArray(whiteRouter, location.pathname)) {
			const { keys = '/auth/exception/403', component } = noPermission;
			const panes = this.state.panes;
			panes[panes.length - 1].component = component;
			panes[panes.length - 1].name = name;
			panes[panes.length - 1].key = keys;
			this.setState({ panes, activeKey: keys });
			return;
		}
		if (keys === '/' || !name) {
			return;
		}
		const panes = this.state.panes;
		const activeKey = keys;
		let isExist = false;
		for (let i = 0; i < panes.length; i++) {
			if (panes[i].key === activeKey) {
				isExist = true;
				break;
			}
		}

		if (isExist) {
			this.setState({
				activeKey
			});
		} else {
			panes.push({ name, key: activeKey, component });
			this.setState({ panes, activeKey });
		}
	}

	onChange = activeKey => {
		this.props.dispatch(
			routerRedux.push({
				pathname: activeKey
			})
		);
	};

	onEdit = (targetKey, action) => {
		this[action](targetKey);
	};

	remove = targetKey => {
		if (this.state.panes.length === 1) {
			message.warning('窗口不能全部关闭');
			return;
		}
		let activeKey = this.state.activeKey;
		let lastIndex;
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key;
		}
		this.setState({ panes, activeKey });
	};

	render() {
		const { location, match, history } = this.props;
		return (
			<div>
				<Tabs
					hideAdd
					onChange={this.onChange}
					activeKey={this.state.activeKey}
					type="editable-card"
					onEdit={this.onEdit}
				>
					{this.state.panes.map(pane => (
						<TabPane tab={pane.name} key={pane.key}>
							<pane.component
								history={history}
								location={location}
								match={match}
								onCloseCurrentTab={(pathname, action) =>
									this.onEdit(pathname, action)
								}
							/>
						</TabPane>
					))}
				</Tabs>
			</div>
		);
	}
}
