export default [
	{
		path: 'auth/app',
		icon: 'home',
		name: '系统主页',
		children: []
	},
	{
		path: 'auth/systems',
		icon: 'sliders',
		name: '增删查改',
		children: [
			{
				path: 'curd',
				name: 'CURD',
				children: []
			}
		]
	},
	{
		path: 'auth/dataInput',
		name: '数据录入',
		children: [
			{
				path: 'transfer',
				name: '穿梭框'
			}
		]
	}
];
