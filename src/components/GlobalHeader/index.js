import React, { PureComponent } from 'react';
import { Avatar, Dropdown, Icon, Layout, Menu, Tooltip } from 'antd';
import styles from './index.less';
const { Item: MenuItem, Divider: MenuDivider } = Menu;
const { Header } = Layout;
export default class GlobalHeader extends PureComponent {
	toggle = () => {
		const { collapsed, onCollapse } = this.props;
		onCollapse(!collapsed);
	};

	render() {
		const { onMenuClick, currentUser, collapsed } = this.props;
		const menu = (
			<Menu
				className={styles.menu}
				selectedKeys={[]}
				onClick={onMenuClick}
			>
				<MenuItem key="news">
					{' '}
					<Icon type="book" />
					门户首页
				</MenuItem>
				<MenuItem key="setting">
					{' '}
					<Icon type="setting" />
					基础设置
				</MenuItem>
				<MenuItem key="changelog">
					{' '}
					<Icon type="file-text" />
					更新日志
				</MenuItem>
				<MenuDivider />
				<MenuItem key="logout">
					<Icon type="logout" />
					退出登录
				</MenuItem>
			</Menu>
		);
		return (
			<Header className={styles.header}>
				<Icon
					className={styles.trigger}
					type={collapsed ? 'right-square-o' : 'left-square-o'}
					onClick={this.toggle}
				/>
				<div className={styles.right}>
					{/* <HeaderSearch
						className={`${styles.action} ${styles.search}`}
						placeholder="站内搜索"
						dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
						onSearch={value => {
							console.log('input', value); // eslint-disable-line
						}}
						onPressEnter={value => {
							console.log('enter', value); // eslint-disable-line
						}}
					/> */}
					<Tooltip title="使用文档">
						<a className={styles.action}>
							<Icon type="question-circle-o" />
						</a>
					</Tooltip>
					{currentUser.name ? (
						<Dropdown overlay={menu}>
							<span
								className={`${styles.action} ${styles.account}`}
							>
								<Avatar size="small" className={styles.avatar}>
									{currentUser.name.charAt(
										currentUser.name.length - 1
									)}
								</Avatar>
							</span>
						</Dropdown>
					) : (
						<Spin size="small" style={{ marginLeft: 8 }} />
					)}
				</div>
			</Header>
		);
	}
}
