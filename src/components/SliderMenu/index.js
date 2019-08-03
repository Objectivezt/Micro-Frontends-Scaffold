import 'rc-drawer-menu/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import SliderMenu from './SliderMenu';

const SliderMenuWrapper = props =>
	props.isMobile ? (
		<DrawerMenu
			parent={null}
			level={null}
			iconChild={null}
			open={!props.collapsed}
			onMaskClick={() => {
				props.onCollapse(true);
			}}
			width="256px"
		>
			<SliderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
		</DrawerMenu>
	) : (
			<SliderMenu {...props} />
		);

export default SliderMenuWrapper;
