const isLocalMenu = process.env.NODE_ENV === 'development';

// 默认组件属性
export { default as globalCardProps } from './globalUIProps/Card.config';

export {
	default as globalPaginationProps
} from './globalUIProps/Pagination.config';

export { default as globalColProps } from './globalUIProps/Col.config';

export { default as globalSelectProps } from './globalUIProps/Select.config';

export { default as globalTableProps } from './globalUIProps/Table.config';

export {
	default as globalInputNumberProps
} from './globalUIProps/InputNumber.config';

export { default as globalModalProps } from './globalUIProps/Modal.config';

export {
	default as globalRangePickerProps
} from './globalUIProps/RangePicker.config';

export const globalFormItemLayout = {
	labelCol: {
		sm: { span: 8 },
		md: { span: 8 },
		lg: { span: 6 },
		xl: { span: 6 },
		xxl: { span: 6 }
	},
	wrapperCol: {
		sm: { span: 16 },
		md: { span: 16 },
		lg: { span: 18 },
		xl: { span: 18 },
		xxl: { span: 18 }
	}
};

export const globalFormItemBox = {
	style: { width: '85%' },
	placeholder: '请输入'
};

export const globalRequire = {
	colon: true,
	required: true
};

// 系统配置属性
export const projectName = 'Scaffold';

export const localMenuData = isLocalMenu;

export { default as localMenuDataArr } from './localMenu';

export { default as localButtonArr } from './localButton';

export const baseUrl = '/api/';

export const globalDefineListSize = {
	pageNum: 1,
	pageSize: 10
};

export const globalBigListSize = {
	pageNum: 1,
	pageSize: 200
};

export const globalDateFormat = 'YYYY-MM-DD';

export { default as baseRouterUrl } from './baseRouterUrl';

export const fileType = ''; // 文件处理

export const fileMaxSize = '';

export const queryLayout = {
	'screen-xs': {
		maxWidth: 575
	},
	'screen-sm': {
		minWidth: 576,
		maxWidth: 767
	},
	'screen-md': {
		minWidth: 768,
		maxWidth: 991
	},
	'screen-lg': {
		minWidth: 992,
		maxWidth: 1199
	},
	'screen-xl': {
		minWidth: 1200
	}
};
